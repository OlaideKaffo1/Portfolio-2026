export default function SectionHeading({ title, subtitle }: { title: string; subtitle: string }) {
  return (
    <div>
      <h2 className="text-[20px] leading-[30px]">{title}</h2>
      <p className="mt-1 text-[16px] leading-[22px] text-muted">{subtitle}</p>
    </div>
  );
}
