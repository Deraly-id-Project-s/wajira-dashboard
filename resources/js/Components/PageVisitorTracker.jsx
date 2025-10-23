import { useEffect, useState } from "react";
import useFetchData from "@/Hooks/useFetchData";
import getSessionId from '@/utils/session';

const PageVisitorTracker = () => {
  const [ipAddress, setIpAddress] = useState(null);
  const [shouldSend, setShouldSend] = useState(false);

  const session_id = getSessionId();

  useEffect(() => {
    const fetchIP = async () => {
      const apis = [
        "https://api.ipify.org?format=json",
        "https://ipapi.co/json/",
        "https://ifconfig.me/all.json",
        "https://ipwho.is/",
      ];

      for (const url of apis) {
        try {
          const res = await fetch(url, { mode: "cors" });
          const text = await res.text();
          let ip = null;

          if (text.includes("{")) {
            const data = JSON.parse(text);
            ip = data.ip || data.query || data.ip_address || data.ipv4;
          } else {
            ip = text.match(/(\d{1,3}\.){3}\d{1,3}/)?.[0];
          }

          if (ip && /^(\d{1,3}\.){3}\d{1,3}$/.test(ip)) {
            setIpAddress(ip);
            setShouldSend(true);
            break;
          }
        } catch (err) {
          console.warn("Failed fetching IP from", url, err);
        }
      }
    };

    fetchIP();
  }, []);

  const { data, loading, error } = useFetchData(
    shouldSend ? "/api/page-visitor" : null,
    shouldSend
      ? {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            session_id: session_id,
            ip_address: ipAddress,
            url_visited: window.location.href,
            referrer: document.referrer || null,
            country:
              Intl.DateTimeFormat().resolvedOptions().timeZone || "Unknown",
            user_agent: navigator.userAgent,
            platform: navigator.platform,
          }),
        }
      : {},
    [shouldSend]
  );

  if (error) console.warn("PageVisitorTracker Error:", error);
  if (data) console.log("Visitor logged ✅", data);

  return null;
};

export default PageVisitorTracker;
