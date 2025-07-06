export default function MiniCards({ title, imageURL, onClick }) {
  return (
    <div
      className="w-full max-w-[150px] h-28 bg-white rounded-2xl shadow-sm border border-slate-200 p-2 flex flex-col overflow-hidden items-center hover:bg-slate-100 hover:shadow-md"
      onClick={onClick}
    >
      <img src={imageURL} alt={title} className="rounded-lg mb-2 w-full" />
      <h2 className={`${title.length > 13 ? "text-sm" : "text-base"} text`}>
        {title}
      </h2>
    </div>
  );
}
