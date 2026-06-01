import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Eye, X, ChevronLeft, ChevronRight, Play, Pause, 
  ZoomIn, Calendar, Sparkles, Image as ImageIcon, Camera,
  Grid, Compass, Download, ShieldCheck
} from 'lucide-react';

interface PhotoItem {
  id: string;
  src: string;
  title: string;
  category: 'executive' | 'casual' | 'smart-formal' | 'city';
  description: string;
  date: string;
  resolution: string;
  aspect: string;
}

const PORTFOLIO_PHOTOS: PhotoItem[] = [
  {
    id: 'photo-1',
    src: '/src/assets/images/ChatGPT Image Jun 1, 2026, 04_30_56 AM.png',
    title: 'The Modern Executive Look',
    category: 'executive',
    description: 'Polished corporate style walking gracefully in an ultra-modern city hub during blue hour.',
    date: 'Jun 2026',
    resolution: '1024 x 1536',
    aspect: 'Portrait 2:3'
  },
  {
    id: 'photo-2',
    src: '/src/assets/images/ChatGPT Image Jun 1, 2026, 04_31_16 AM.png',
    title: 'Precision & Focus',
    category: 'smart-formal',
    description: 'Sophisticated pose displaying crisp style lines, white shirt highlights, and absolute composure.',
    date: 'Jun 2026',
    resolution: '1024 x 1536',
    aspect: 'Portrait 2:3'
  },
  {
    id: 'photo-3',
    src: '/src/assets/images/ChatGPT Image Jun 1, 2026, 04_31_24 AM.png',
    title: 'Leadership & Vision',
    category: 'smart-formal',
    description: 'Broad-shouldered tailoring against ambient urban city architectural structures.',
    date: 'Jun 2026',
    resolution: '1024 x 1536',
    aspect: 'Portrait 2:3'
  },
  {
    id: 'photo-4',
    src: '/src/assets/images/ChatGPT Image Jun 1, 2026, 04_31_31 AM.png',
    title: 'Smart Athletic Formal',
    category: 'casual',
    description: 'Modern styling combining crisp tuxedo jacket with immaculate white athletic footwear.',
    date: 'Jun 2026',
    resolution: '1024 x 1536',
    aspect: 'Portrait 2:3'
  },
  {
    id: 'photo-5',
    src: '/src/assets/images/ChatGPT Image Jun 1, 2026, 04_31_39 AM.png',
    title: 'Metropolitan Journey',
    category: 'city',
    description: 'Strolling confidently near a premier white sedan, framed by grand avenue palm trees.',
    date: 'Jun 2026',
    resolution: '1024 x 1536',
    aspect: 'Portrait 2:3'
  },
  {
    id: 'photo-6',
    src: '/src/assets/images/ChatGPT Image Jun 1, 2026, 04_52_54 AM.png',
    title: 'Sunset Skyline Profile',
    category: 'executive',
    description: 'Striking portrait emphasizing sleek black bowtie outline, clean tailoring, and city nightscapes.',
    date: 'Jun 2026',
    resolution: '1024 x 1536',
    aspect: 'Portrait 2:3'
  }
];

export default function PhotoGallery() {
  const [selectedIdx, setSelectedIdx] = useState<number | null>(null);
  const [activeFilter, setActiveFilter] = useState<'all' | 'executive' | 'casual' | 'smart-formal' | 'city'>('all');
  const [isPlaying, setIsPlaying] = useState(false);
  const [zoomEnabled, setZoomEnabled] = useState(false);

  // Keyboard navigation for Lightbox
  useEffect(() => {
    if (selectedIdx === null) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') {
        handleNext();
      } else if (e.key === 'ArrowLeft') {
        handlePrev();
      } else if (e.key === 'Escape') {
        handleClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [selectedIdx]);

  // Slideshow autoplay cycle
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isPlaying && selectedIdx !== null) {
      timer = setTimeout(() => {
        handleNext();
      }, 3500);
    }
    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [isPlaying, selectedIdx]);

  const filteredPhotos = activeFilter === 'all'
    ? PORTFOLIO_PHOTOS
    : PORTFOLIO_PHOTOS.filter(photo => photo.category === activeFilter);

  const handleOpen = (idxInFiltered: number) => {
    // Find absolute index in the original database
    const selectedItem = filteredPhotos[idxInFiltered];
    const absoluteIdx = PORTFOLIO_PHOTOS.findIndex(p => p.id === selectedItem.id);
    setSelectedIdx(absoluteIdx);
    setZoomEnabled(false);
  };

  const handleClose = () => {
    setSelectedIdx(null);
    setIsPlaying(false);
    setZoomEnabled(false);
  };

  const handleNext = () => {
    if (selectedIdx === null) return;
    setSelectedIdx((prevIdx) => (prevIdx === null ? 0 : (prevIdx + 1) % PORTFOLIO_PHOTOS.length));
    setZoomEnabled(false);
  };

  const handlePrev = () => {
    if (selectedIdx === null) return;
    setSelectedIdx((prevIdx) => (prevIdx === null ? 0 : (prevIdx - 1 + PORTFOLIO_PHOTOS.length) % PORTFOLIO_PHOTOS.length));
    setZoomEnabled(false);
  };

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  return (
    <div id="gallery" className="space-y-10">
      
      {/* Search and Navigation Toolbar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 bg-slate-900/45 p-6 rounded-3xl border border-slate-900 backdrop-blur-sm">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-emerald-500/10 rounded-xl text-emerald-400 border border-emerald-500/20">
            <Camera className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-display font-black text-lg text-white">Visual Catalog</h3>
            <p className="text-xs text-slate-400">View and explore Robert Mugisha's professional photography asset suite</p>
          </div>
        </div>

        {/* Category filtering selectors */}
        <div className="flex flex-wrap gap-1.5 bg-slate-950 p-1.5 rounded-2xl border border-slate-850 self-start md:self-auto">
          {[
            { id: 'all', label: 'All Photos', icon: Grid },
            { id: 'executive', label: 'Executive', icon: Sparkles },
            { id: 'smart-formal', label: 'Formal Wear', icon: ShieldCheck },
            { id: 'casual', label: 'Smart Casual', icon: Compass },
            { id: 'city', label: 'Cityscape', icon: ImageIcon }
          ].map((tab) => {
            const ActiveIcon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveFilter(tab.id as any)}
                className={`flex items-center gap-1 px-3.5 py-1.5 rounded-xl text-xs font-mono font-bold tracking-wide uppercase transition-all duration-200 cursor-pointer ${
                  activeFilter === tab.id
                    ? 'bg-gradient-to-r from-emerald-450 via-cyan-450 to-indigo-500 text-slate-950 shadow-md'
                    : 'text-slate-400 hover:text-white hover:bg-slate-900/30'
                }`}
              >
                <ActiveIcon className="w-3.5 h-3.5 shrink-0" />
                {tab.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Masonry Portrait Photo Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <AnimatePresence mode="popLayout">
          {filteredPhotos.map((photo, index) => (
            <motion.div
              layout
              key={photo.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3 }}
              className="bg-slate-900 border border-slate-850 hover:border-slate-700/60 rounded-3xl p-4 transition-all duration-300 group shadow-lg flex flex-col justify-between"
            >
              <div className="relative overflow-hidden rounded-2xl aspect-[2/3] bg-slate-950 border border-slate-800">
                {/* Real rendering of photo */}
                <img 
                  src={photo.src} 
                  alt={photo.title} 
                  className="w-full h-full object-cover transform scale-100 group-hover:scale-105 transition-transform duration-500" 
                  referrerPolicy="no-referrer"
                  loading="lazy"
                />
                
                {/* Dark Hover Overlay */}
                <div className="absolute inset-0 bg-slate-950/70 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-between p-5">
                  <div className="flex justify-between items-center">
                    <span className="text-[10px] font-mono tracking-wider font-bold bg-emerald-500 text-slate-950 px-2 py-0.5 rounded uppercase">
                      {photo.category}
                    </span>
                    <span className="text-[9px] font-mono text-slate-400">
                      {photo.resolution}
                    </span>
                  </div>

                  <div className="space-y-2">
                    <p className="text-xs text-slate-300 font-light leading-relaxed">
                      {photo.description}
                    </p>
                    <button 
                      onClick={() => handleOpen(index)}
                      className="inline-flex items-center gap-1.5 text-xs font-mono font-bold text-emerald-400 hover:text-emerald-300 transition-colors w-full bg-slate-900/85 hover:bg-slate-900 p-2.5 rounded-xl border border-slate-800 cursor-pointer"
                    >
                      <Eye className="w-4 h-4" /> Expand Fullscreen Lightbox
                    </button>
                  </div>
                </div>
              </div>

              {/* Card Footer Text Info */}
              <div className="pt-4 space-y-1.5">
                <h4 className="font-display font-black text-sm text-white group-hover:text-emerald-450 transition-colors">
                  {photo.title}
                </h4>
                
                <div className="flex items-center justify-between text-[10px] font-mono text-slate-500 pt-1">
                  <span className="flex items-center gap-1 border-r border-slate-850 pr-2.5">
                    <Calendar className="w-3 h-3 text-emerald-402" /> {photo.date}
                  </span>
                  <span>{photo.aspect}</span>
                  <span className="text-emerald-400 uppercase tracking-widest font-extrabold text-[9px]">Verified Premium</span>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Zero State if Filter Empty */}
      {filteredPhotos.length === 0 && (
        <div className="bg-slate-900/30 border border-dashed border-slate-800 rounded-3xl p-12 text-center">
          <ImageIcon className="w-8 h-8 text-slate-600 mx-auto mb-3" />
          <h4 className="font-display font-bold text-slate-300 text-sm">No Images Match filter</h4>
          <p className="text-xs text-slate-500 mt-1">Please select "All Photos" to reset navigation pathways.</p>
        </div>
      )}

      {/* HIGH-FIDELITY INTERACTIVE SLIDESHOW LIGHTBOX MODAL */}
      <AnimatePresence>
        {selectedIdx !== null && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-slate-950/98 backdrop-blur-md flex flex-col justify-between p-4 md:p-8"
            id="lightbox-backdrop"
            onClick={(e) => {
              if ((e.target as HTMLElement).id === 'lightbox-container' || (e.target as HTMLElement).id === 'lightbox-backdrop') {
                handleClose();
              }
            }}
          >
            {/* Header Control Panel */}
            <div className="flex items-center justify-between w-full max-w-7xl mx-auto border-b border-slate-900 pb-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-emerald-500/10 rounded-lg text-emerald-400 border border-emerald-500/20">
                  <Camera className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-sm font-display font-black text-white">{PORTFOLIO_PHOTOS[selectedIdx].title}</h4>
                  <p className="text-[10px] font-mono text-slate-400">File catalog: {selectedIdx + 1} of {PORTFOLIO_PHOTOS.length}</p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-2">
                {/* Autoplay Slideshow */}
                <button 
                  onClick={togglePlay}
                  className={`p-2 rounded-lg border transition-all cursor-pointer flex items-center gap-1.5 text-[10px] font-mono font-bold tracking-wider uppercase ${
                    isPlaying 
                      ? 'bg-amber-500/10 border-amber-500/30 text-amber-500' 
                      : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white'
                  }`}
                  title={isPlaying ? "Pause Slideshow" : "Play Autoplay Slideshow"}
                >
                  {isPlaying ? (
                    <>
                      <Pause className="w-3.5 h-3.5 animate-pulse" /> Autoplay ON
                    </>
                  ) : (
                    <>
                      <Play className="w-3.5 h-3.5" /> Slideshow
                    </>
                  )}
                </button>

                {/* ZOOM toggle */}
                <button
                  onClick={() => setZoomEnabled(!zoomEnabled)}
                  className={`p-2 rounded-lg border transition-all cursor-pointer ${
                    zoomEnabled 
                      ? 'bg-emerald-500/20 border-emerald-500/40 text-emerald-400' 
                      : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white'
                  }`}
                  title="Toggle Fit / Zoom Close-up"
                >
                  <ZoomIn className="w-4 h-4" />
                </button>

                {/* Direct Link Open / Download */}
                <a 
                  href={PORTFOLIO_PHOTOS[selectedIdx].src} 
                  target="_blank"
                  download={PORTFOLIO_PHOTOS[selectedIdx].title}
                  className="p-2 bg-slate-900 border border-slate-800 hover:bg-slate-800 text-slate-400 hover:text-white rounded-lg transition-all"
                  title="Download / Open Original Image"
                  referrerPolicy="no-referrer"
                >
                  <Download className="w-4 h-4" />
                </a>

                {/* Close Button */}
                <button 
                  onClick={handleClose}
                  className="p-2 bg-slate-900 border border-slate-800 hover:bg-rose-500/20 hover:border-rose-500/40 text-rose-450 hover:text-rose-400 rounded-lg transition-all cursor-pointer"
                  title="Close (Esc)"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Central Stage: Image & Navigation triggers */}
            <div id="lightbox-container" className="flex-1 flex items-center justify-between max-w-7xl w-full mx-auto my-6 relative min-h-0">
              
              {/* Previous control */}
              <button 
                onClick={handlePrev}
                className="absolute left-0 z-10 p-3 bg-slate-900/80 hover:bg-slate-900 border border-slate-800 rounded-2xl hover:text-emerald-450 hover:border-emerald-500/30 transition-all text-slate-400 cursor-pointer hidden md:flex items-center justify-center shadow-lg"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>

              {/* Main Active Image with standard referral integrity */}
              <div className="flex-1 h-full flex items-center justify-center overflow-auto px-4 relative">
                <motion.div
                  key={selectedIdx}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.25 }}
                  className="max-h-full max-w-full flex justify-center items-center h-full relative"
                >
                  <img 
                    src={PORTFOLIO_PHOTOS[selectedIdx].src} 
                    alt={PORTFOLIO_PHOTOS[selectedIdx].title} 
                    className={`max-h-full max-w-full object-contain rounded-2xl border border-slate-900 shadow-2xl transition-all duration-300 ${
                      zoomEnabled ? 'scale-110 cursor-zoom-out' : 'scale-100'
                    }`}
                    onClick={() => setZoomEnabled(!zoomEnabled)}
                    referrerPolicy="no-referrer"
                  />
                </motion.div>
                
                {/* Autoplay duration bar */}
                {isPlaying && (
                  <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-48 h-1 bg-slate-900 rounded-full overflow-hidden">
                    <motion.div 
                      key={selectedIdx + "-progress"}
                      initial={{ width: 0 }}
                      animate={{ width: "100%" }}
                      transition={{ duration: 3.5, ease: "linear" }}
                      className="h-full bg-emerald-400"
                    />
                  </div>
                )}
              </div>

              {/* Next control */}
              <button 
                onClick={handleNext}
                className="absolute right-0 z-10 p-3 bg-slate-900/80 hover:bg-slate-900 border border-slate-800 rounded-2xl hover:text-emerald-450 hover:border-emerald-500/30 transition-all text-slate-400 cursor-pointer hidden md:flex items-center justify-center shadow-lg"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </div>

            {/* Footer metadata description panel */}
            <div className="w-full max-w-4xl mx-auto bg-slate-900/50 border border-slate-900 p-5 rounded-2xl text-center space-y-1 sm:space-y-0.5 backdrop-blur-md">
              <h5 className="text-white text-sm font-display font-extrabold tracking-tight">
                {PORTFOLIO_PHOTOS[selectedIdx].title}
              </h5>
              <p className="text-xs text-slate-400 font-light max-w-2xl mx-auto leading-relaxed">
                {PORTFOLIO_PHOTOS[selectedIdx].description}
              </p>
              
              <div className="flex flex-wrap lg:flex-nowrap justify-center items-center gap-x-6 gap-y-1 text-[10px] font-mono text-slate-500 pt-2.5 border-t border-slate-900/50 mt-2.5 max-w-xs sm:max-w-md mx-auto">
                <span className="uppercase text-emerald-450 font-bold bg-emerald-500/10 px-2.5 py-0.5 rounded border border-emerald-500/10">
                  {PORTFOLIO_PHOTOS[selectedIdx].category}
                </span>
                <span>Date: {PORTFOLIO_PHOTOS[selectedIdx].date}</span>
                <span>Resolution: {PORTFOLIO_PHOTOS[selectedIdx].resolution}</span>
              </div>
            </div>

            {/* Mobile swipe touch prompts */}
            <div className="flex md:hidden justify-center items-center gap-4 text-xs font-mono text-slate-500 pt-3">
              <button onClick={handlePrev} className="px-2.5 py-1 bg-slate-900 border border-slate-800 rounded">&lt; Prev</button>
              <span>Slide Navigation</span>
              <button onClick={handleNext} className="px-2.5 py-1 bg-slate-900 border border-slate-800 rounded">Next &gt;</button>
            </div>

          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
