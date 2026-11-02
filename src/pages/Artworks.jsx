import { useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { X, ArrowUpRight } from 'lucide-react';
import { supabase } from '../supabaseClient';
import './Artworks.css';

const PORTFOLIO = [
  { id: 'firefly-path', title: 'The Firefly Path', category: 'Worlds & scenes', medium: 'Environment illustration', img: '/artworks/firefly-path.jpg', description: 'A small journey into a forest alive with fireflies.' },
  { id: 'first-haircut', title: 'First Haircut', category: 'Children’s illustration', medium: 'Picture-book storytelling', img: '/artworks/first-haircut.jpg', description: 'A tender, everyday milestone told with warmth and a little wonder.' },
  { id: 'breakfast-table', title: 'Breakfast Table', category: 'Worlds & scenes', medium: 'Digital painting', img: '/artworks/breakfast-table.jpg', description: 'A quiet morning scene, lit by a single lamp.' },
  { id: 'song-for-my-cat', title: 'A Song for My Cat', category: 'Book covers', medium: 'Picture-book cover concept', img: '/artworks/song-for-my-cat.jpg', description: 'A boy plays violin for his cat on a sunny courtyard step.' },
  { id: 'spring-crush', title: 'Spring Crush', category: 'Character design', medium: 'Character illustration', img: '/artworks/spring-crush.jpg', description: 'A close moment between two characters, developed from a loose line sketch.' },
  { id: 'orange-thief', title: 'Orange Thief', category: 'Character design', medium: 'Digital illustration', img: '/artworks/orange-thief.jpg', description: 'A playful gesture study of a curious cat among the leaves.' },
  { id: 'bridge-at-dusk', title: 'Bridge at Dusk', category: 'Worlds & scenes', medium: 'Landscape illustration', img: '/artworks/bridge-at-dusk.jpg', description: 'An imagined garden and bridge in the last light of day.' },
  { id: 'gone-fishing', title: 'Gone Fishing', category: 'Worlds & scenes', medium: 'Scene illustration', img: '/artworks/gone-fishing.jpg', description: 'A peaceful afternoon by the water.' },
  { id: 'portrait-in-olive', title: 'Portrait in Olive', category: 'Portraits', medium: 'Portrait study', img: '/artworks/portrait-in-olive.jpg', description: 'An expressive portrait in a limited, earthy palette.' },
  { id: 'gentle-giant', title: 'The Gentle Giant', category: 'Children’s illustration', medium: 'Picture-book illustration', img: '/artworks/gentle-giant.jpg', description: 'A young reader finds a gentle companion in a field of flowers.' },
  { id: 'little-explorer', title: 'Little Explorer', category: 'Character design', medium: 'Character design', img: '/artworks/little-explorer.jpg', description: 'A curious character study with a favourite teddy in tow.' },
  { id: 'street-style', title: 'Street Style', category: 'Character design', medium: 'Character design', img: '/artworks/street-style.jpg', description: 'A confident character developed through silhouette, costume and colour.' },
  { id: 'spring-crush-sketch', title: 'Spring Crush: First Lines', category: 'Sketchbook', medium: 'Line sketch', img: '/artworks/spring-crush-sketch.jpg', description: 'The first loose sketch, finding the expression and glance between two characters.' },
  { id: 'orange-thief-sketch', title: 'Orange Thief: Gesture Studies', category: 'Sketchbook', medium: 'Gesture studies', img: '/artworks/orange-thief-sketch.jpg', description: 'Loose cat gesture drawings exploring pose and attitude.' },
  { id: 'orange-thief-value-study', title: 'Orange Thief: Value Study', category: 'Sketchbook', medium: 'Grayscale value study', img: '/artworks/orange-thief-value-study.jpg', description: 'A monochrome study to establish light and form before colour.' },
];

const Artworks = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [artworks, setArtworks] = useState(PORTFOLIO);
  const [lightboxImg, setLightboxImg] = useState(null);
  const requested = searchParams.get('category') || 'All';
  const categories = useMemo(() => ['All', ...new Set(artworks.map((art) => art.category))], [artworks]);
  const activeTab = categories.includes(requested) ? requested : 'All';
  const filteredArts = activeTab === 'All' ? artworks : artworks.filter((art) => art.category === activeTab);

  useEffect(() => {
    let mounted = true;
    supabase.from('artworks').select('*').order('id', { ascending: true }).then(({ data }) => {
      const extra = (data || []).filter((item) => item.img || item.image_url).map((item) => ({
        id: `supabase-${item.id}`,
        title: item.title || 'Artwork',
        category: item.category || 'Artwork',
        medium: item.medium || item.technique || 'Illustration',
        img: item.img || item.image_url,
        description: item.description || '',
        price: item.price,
      }));
      if (mounted && extra.length) setArtworks([...PORTFOLIO, ...extra]);
    });
    return () => { mounted = false; };
  }, []);

  useEffect(() => {
    if (!lightboxImg) return undefined;
    const onKeyDown = (event) => { if (event.key === 'Escape') setLightboxImg(null); };
    window.addEventListener('keydown', onKeyDown);
    document.body.style.overflow = 'hidden';
    return () => { window.removeEventListener('keydown', onKeyDown); document.body.style.overflow = ''; };
  }, [lightboxImg]);

  return <main className="artworks-page portfolio-gallery">
    <header className="gallery-heading"><p className="eyebrow">A collection of stories & studies</p><h1>Pictures with<br /><em>something to say.</em></h1><p>Character, colour, quiet moments and imagined places. Browse selected illustration work and a glimpse into the process.</p></header>
    <div className="gallery-controls" aria-label="Filter artwork by category" role="group">{categories.map((category) => <button key={category} type="button" className={`gallery-filter ${activeTab === category ? 'active' : ''}`} aria-pressed={activeTab === category} onClick={() => setSearchParams(category === 'All' ? {} : { category })}>{category}</button>)}</div>
    <div className="portfolio-masonry" aria-live="polite">{filteredArts.map((art, index) => <button className="portfolio-artwork" key={art.id} type="button" onClick={() => setLightboxImg(art)} aria-label={`View ${art.title}`}>
      <span className={`artwork-image artwork-image-${index % 5}`}><img src={art.img} alt={`${art.title}, ${art.medium} by Karuna Gupta`} loading={index < 4 ? 'eager' : 'lazy'} /><span className="artwork-open"><ArrowUpRight size={20} /></span></span>
      <span className="gallery-caption"><span><strong>{art.title}</strong><small>{art.medium}</small></span><small>{art.category}</small></span>
    </button>)}</div>
    {lightboxImg && <div className="artwork-lightbox" role="dialog" aria-modal="true" aria-label={`${lightboxImg.title} artwork`} onClick={() => setLightboxImg(null)}>
      <button className="lightbox-close" type="button" aria-label="Close artwork viewer" onClick={() => setLightboxImg(null)}><X size={25} /></button>
      <div className="lightbox-artwork-content" onClick={(event) => event.stopPropagation()}><img src={lightboxImg.img} alt={`${lightboxImg.title}, ${lightboxImg.medium} by Karuna Gupta`} /><div className="lightbox-copy"><p className="eyebrow">{lightboxImg.category}</p><h2>{lightboxImg.title}</h2><p>{lightboxImg.description}</p><p className="lightbox-medium">{lightboxImg.medium}</p></div></div>
    </div>}
  </main>;
};

export default Artworks;
