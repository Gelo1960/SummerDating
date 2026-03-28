export interface Place {
  name: string;
  neighborhood?: string;
  category?: string;
  subcategory?: string;
  tags?: string[];
  description?: string;
  why_special?: string;
  anecdote?: string;
  best_time?: string;
  budget_level?: string;
  budget_estimate?: string;
  duration_minutes?: number;
  score_global?: number;
  google_rating?: number;
  good_for?: string[];
}

interface PlaceCardProps {
  place: Place;
}

export default function PlaceCard({ place }: PlaceCardProps) {
  const rating = place.score_global ?? place.google_rating;
  const displayDescription = place.description || place.why_special;
  const durationLabel = place.duration_minutes
    ? place.duration_minutes >= 60
      ? `${Math.round(place.duration_minutes / 60)}h`
      : `${place.duration_minutes} min`
    : null;

  return (
    <article className="place-card">
      <div className="place-card-header">
        <div>
          <h3 className="place-name">{place.name}</h3>
          {place.neighborhood && (
            <p className="place-neighborhood">{place.neighborhood}</p>
          )}
        </div>
        {rating != null && (
          <span className="place-rating" aria-label={`Note : ${rating} sur 5`}>
            <span aria-hidden="true">&#9733;</span> {rating.toFixed(1)}
          </span>
        )}
      </div>

      {place.tags && place.tags.length > 0 && (
        <div className="place-tags">
          {place.tags.map((tag) => (
            <span key={tag} className="place-tag">
              {tag}
            </span>
          ))}
        </div>
      )}

      {displayDescription && (
        <p className="place-description">{displayDescription}</p>
      )}

      <div className="place-info">
        {place.budget_level && (
          <span className="place-info-pill">
            <span aria-hidden="true">&#128176;</span> {place.budget_level}
            {place.budget_estimate ? ` (${place.budget_estimate})` : ''}
          </span>
        )}
        {durationLabel && (
          <span className="place-info-pill">
            <span aria-hidden="true">&#9201;</span> {durationLabel}
          </span>
        )}
        {place.subcategory && (
          <span className="place-info-pill">{place.subcategory}</span>
        )}
      </div>

      {place.why_special && place.description && (
        <div className="place-special">
          <p className="place-special-label">
            Pourquoi c&apos;est parfait pour un date :
          </p>
          <p className="place-special-text">{place.why_special}</p>
        </div>
      )}

      {place.best_time && (
        <p className="place-best-time">
          <strong>Meilleur moment :</strong> {place.best_time}
        </p>
      )}
    </article>
  );
}
