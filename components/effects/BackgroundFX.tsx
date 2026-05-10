/* Fixed full-viewport visual layer behind every section. CSS handles
   the animation; this component just renders the DOM. The conic /
   trail / scan / grain layers from tmp/portfolio/effects.js are
   omitted here because the source CSS keeps them at display:none —
   add them back if a future theme variant turns them on. */

export function BackgroundFX() {
  return (
    <div className="bg-fx" aria-hidden="true">
      <div className="bg-fx-mesh">
        <div className="bg-fx-blob bg-fx-blob-1" />
        <div className="bg-fx-blob bg-fx-blob-2" />
        <div className="bg-fx-blob bg-fx-blob-3" />
      </div>
      <div className="bg-fx-haze" />
      <div className="bg-fx-spotlight" />
    </div>
  );
}
