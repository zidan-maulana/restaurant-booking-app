import React from 'react';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';
import heroImg from '../assets/hero.png';

export default function Home({ onNavigate }) {
  return (
    <div className="flex flex-col gap-24">
      {/* 1. Hero Section */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center pt-8">
        <div className="lg:col-span-7 flex flex-col gap-6 text-left">
          <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-antique-gold">
            Est. 2026 — Jakarta
          </span>
          <h1 className="font-serif italic font-light text-5xl sm:text-6xl md:text-7xl text-bitter-chocolate leading-[1.15] tracking-tight">
            A space gathered around the *thoughtful* table.
          </h1>
          <p className="font-sans text-base text-bitter-chocolate/75 max-w-xl leading-relaxed">
            Welcome to The Table. An intimate dining experience celebrating honest, seasonal ingredients and vintage hospitality. We invite you to slow down, converse, and enjoy.
          </p>
          <div className="flex flex-wrap gap-4 mt-4">
            <Button
              variant="primary"
              onClick={() => onNavigate('book')}
            >
              Reserve a Table
            </Button>
            <Button
              variant="secondary"
              onClick={() => {
                const element = document.getElementById('experience');
                element?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              The Experience
            </Button>
          </div>
        </div>

        {/* Asymmetric Framed Image */}
        <div className="lg:col-span-5 flex flex-col items-center lg:items-end justify-center">
          <div className="p-3 bg-warm-cream-dark border border-bitter-chocolate/10 rounded-none w-full max-w-sm">
            <div className="border border-bitter-chocolate/10 overflow-hidden bg-bitter-chocolate/5 h-80 flex items-center justify-center">
              <img
                src={heroImg}
                alt="Main Dining Room"
                className="w-full h-full object-cover grayscale opacity-90 contrast-125"
              />
            </div>
            <p className="font-serif italic text-xs text-bitter-chocolate/60 text-center mt-3">
              Our main dining room, captured in late afternoon light.
            </p>
          </div>
        </div>
      </section>

      {/* Separator Line */}
      <hr className="border-bitter-chocolate/10" />

      {/* 2. Experience Section */}
      <section id="experience" className="grid grid-cols-1 lg:grid-cols-12 gap-12 text-left">
        <div className="lg:col-span-6 flex flex-col justify-center">
          <h2 className="font-serif text-3xl sm:text-4xl italic font-light text-bitter-chocolate leading-relaxed pr-6">
            "We believe that a meal is more than what is on the plate—it is the memory of the room, the sound of the glasses, and the company we keep."
          </h2>
        </div>
        <div className="lg:col-span-6 flex flex-col gap-6 font-sans text-sm text-bitter-chocolate/75 leading-relaxed justify-center">
          <p>
            At The Table, we reject the noise of modern fast dining. Our kitchen works closely with local organic farmers and purveyors to source seasonal ingredients that are prepared with precision and served with warmth.
          </p>
          <p>
            Every chair, light fixture, and ceramic plate has been carefully selected or handcrafted to foster conversation. Whether you are sharing a bottle from our curated natural wine list or celebrating a milestones with loved ones, you are part of our family.
          </p>
        </div>
      </section>

      {/* Separator Line */}
      <hr className="border-bitter-chocolate/10" />

      {/* 3. Reservation Highlight Section */}
      <section className="flex flex-col gap-12 text-left">
        <div className="max-w-2xl">
          <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-antique-gold block mb-3">
            Reservation Process
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl text-bitter-chocolate">
            How to Secure Your Evening
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Card 1 */}
          <Card className="flex flex-col gap-4">
            <span className="font-serif italic text-3xl text-antique-gold font-light">01.</span>
            <h3 className="font-serif text-lg font-semibold text-bitter-chocolate">Choose Your Table</h3>
            <p className="font-sans text-xs text-bitter-chocolate/70 leading-relaxed">
              Explore our range of tables. From cozy two-person booths for intimate evenings to larger tables for groups of four to six guests.
            </p>
          </Card>

          {/* Card 2 */}
          <Card className="flex flex-col gap-4">
            <span className="font-serif italic text-3xl text-antique-gold font-light">02.</span>
            <h3 className="font-serif text-lg font-semibold text-bitter-chocolate">Select Date & Time</h3>
            <p className="font-sans text-xs text-bitter-chocolate/70 leading-relaxed">
              Pick a date and choose an available 30-minute time slot. Confirm your guest count to ensure your booking complies with capacity.
            </p>
          </Card>

          {/* Card 3 */}
          <Card className="flex flex-col gap-4">
            <span className="font-serif italic text-3xl text-antique-gold font-light">03.</span>
            <h3 className="font-serif text-lg font-semibold text-bitter-chocolate">Await Confirmation</h3>
            <p className="font-sans text-xs text-bitter-chocolate/70 leading-relaxed">
              Our hosts review and approve your reservation request. Once confirmed, you will receive instant notification in your dashboard.
            </p>
          </Card>
        </div>

        <div className="flex justify-center mt-4">
          <Button
            variant="primary"
            onClick={() => onNavigate('book')}
          >
            Start Your Reservation
          </Button>
        </div>
      </section>

      {/* 4. Signature Details Section (Vintage Menu style) */}
      <section className="border border-bitter-chocolate/10 bg-warm-cream-dark/20 p-8 sm:p-12 text-center flex flex-col gap-8 max-w-3xl mx-auto w-full">
        <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-antique-gold">
          On The Menu Tonight
        </span>
        <h2 className="font-serif italic text-3xl text-bitter-chocolate">
          Signature Provisions
        </h2>
        <hr className="w-12 border-bitter-chocolate/20 mx-auto" />
        
        <div className="flex flex-col gap-6 text-left max-w-xl mx-auto w-full font-sans text-sm">
          <div className="flex justify-between items-baseline gap-4">
            <div>
              <h4 className="font-serif text-base font-semibold text-bitter-chocolate">Wood-Fired Duck Breast</h4>
              <p className="text-xs text-bitter-chocolate/60 mt-1">Slow roast duck, glazed with wild honey, served with roasted root herbs.</p>
            </div>
            <span className="font-serif text-base font-bold text-bitter-chocolate/80">32</span>
          </div>

          <div className="flex justify-between items-baseline gap-4">
            <div>
              <h4 className="font-serif text-base font-semibold text-bitter-chocolate">Heritage Potato Gnocchi</h4>
              <p className="text-xs text-bitter-chocolate/60 mt-1">Hand-rolled gnocchi, organic chanterelle, brown butter sage sauce.</p>
            </div>
            <span className="font-serif text-base font-bold text-bitter-chocolate/80">24</span>
          </div>

          <div className="flex justify-between items-baseline gap-4">
            <div>
              <h4 className="font-serif text-base font-semibold text-bitter-chocolate">Cured Seabass Crudo</h4>
              <p className="text-xs text-bitter-chocolate/60 mt-1">Meyer lemon, cold-pressed olive oil, sea salt, pickled sea fennel.</p>
            </div>
            <span className="font-serif text-base font-bold text-bitter-chocolate/80">19</span>
          </div>
        </div>
      </section>
    </div>
  );
}
