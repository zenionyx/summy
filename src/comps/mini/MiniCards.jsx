export default function MiniCards({ title, imageURL, onClick, type }) {
  const isFood = type === "food";

  return (
    <div
      className="w-full max-w-[150px] md:max-w-full h-28 md:h-fit bg-white rounded-2xl shadow-sm border border-slate-200 p-2 flex flex-col overflow-hidden items-center hover:bg-slate-100 hover:shadow-md"
      onClick={onClick}
    >
      {isFood ? (
        <div className="w-full h-16 mb-2 rounded-lg overflow-hidden">
          <img
            src={imageURL}
            alt={title}
            className="w-full h-full object-cover"
          />
        </div>
      ) : (
        <img src={imageURL} alt={title} className="rounded-lg mb-2 w-full" />
      )}

      <h2
        className={`${
          title.length >= 17
            ? "text-xs"
            : title.length >= 13
            ? "text-sm"
            : "text-base"
        } text-center`}
      >
        {title}
      </h2>
    </div>
  );
}
