import { useEffect, useState } from "react";
import useFetchData from "@/Hooks/useFetchData";
import getSessionId from "@/utils/session";

const PageVisitorTracker = () => {
  const [ipInfo, setIpInfo] = useState(null);
  const [shouldSend, setShouldSend] = useState(false);

  const session_id = getSessionId();

  useEffect(() => {
    const fetchIPandCountry = async () => {
      try {
        const res = await fetch("https://ipapi.co/json/");
        const data = await res.json();

        if (data && data.ip) {
          setIpInfo({
            ip: data.ip,
            country: data.country_name || "Unknown",
            region: data.region || "",
            city: data.city || "",
          });
          setShouldSend(true);
        }
      } catch (err) {
        console.warn("Failed fetching IP and country info", err);
      }
    };

    fetchIPandCountry();
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
            ip_address: ipInfo?.ip,
            url_visited: window.location.href,
            referrer: document.referrer || null,
            country: ipInfo?.country || "Unknown",
            region: ipInfo?.region || null,
            city: ipInfo?.city || null,
            user_agent: navigator.userAgent,
            platform: navigator.platform,
          }),
        }
      : {},
    [shouldSend]
  );

  // if (error) console.warn("PageVisitorTracker Error:", error);
  // if (data) console.log("Visitor logged ✅", data);

  return null;
};

export default PageVisitorTracker;
