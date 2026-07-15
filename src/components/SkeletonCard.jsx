export default function SkeletonCard() {
  return (
    <div className="skeleton" aria-hidden="true">
      <div className="skel-img" />
      <div className="skel-body">
        <div className="skel-line w-1-2 h-sm" />
        <div className="skel-line w-full" />
        <div className="skel-line w-3-4" />
        <div className="skel-line w-1-2 h-sm" style={{ marginTop: 4 }} />
        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 8 }}>
          <div className="skel-line" style={{ width: '35%', height: 18 }} />
          <div className="skel-line" style={{ width: '28%', height: 32, borderRadius: 8 }} />
        </div>
      </div>
    </div>
  );
}
