// comps/mini/ImageModal.jsx
export default function ImageModal({ imageURL, onClose }) {
  return (
    <div
      className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-lg p-2 max-w-[90%] max-h-[80%]"
        onClick={(e) => e.stopPropagation()} // prevent closing when clicking image
      >
        <img
          src={imageURL}
          alt="Popup"
          className="w-full h-auto rounded-md object-contain"
        />
      </div>
    </div>
  );
}
