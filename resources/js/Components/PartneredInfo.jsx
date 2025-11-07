const PartneredInfo = ({ lang }) => {
    return (
        <div className="max-w-[736px] text-center p-[32px] md:p-[90px]">
            <h2 className="text-[32px] font-semibold text-[#E59920]">
                {lang ?? "We Have Partnered with"}
            </h2>
            <h2 className="text-[32px] font-semibold text-[#858585]">
                Yamaha, Honda, Polytron, Kawasaki & Bajaj MaxAuto
            </h2>
        </div>
    )
}

export default PartneredInfo;