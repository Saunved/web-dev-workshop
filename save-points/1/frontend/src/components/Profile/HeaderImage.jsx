export default function HeaderImage({ handle }) {
  return (
    <img
      src={`https://picsum.photos/800/300.jpg?${handle}`}
      className="h-60 w-full object-cover"
      alt="Header image"
    />
  );
}
