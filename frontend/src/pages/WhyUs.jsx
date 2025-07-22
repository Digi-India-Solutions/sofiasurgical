// WhyUs.jsx
import React from 'react';
import './WhyUs.css';

const WhyUs = () => {
  const reasons = [
    {
      title: "Unmatched Quality Assurance",
      desc: "We are an ISO 9001:2015 certified leader in orthopedic manufacturing, with rigorous quality controls at every step—from design and production to final inspection and packaging—ensuring you receive consistently top-tier implants and instruments."
    },
    {
      title: "World‑Class Production Capabilities",
      desc: "Our advanced in-house manufacturing facilities empower us to handle projects of any scale. Whether you're importing bone plates & screws or trauma implants in bulk or custom quantities, you can trust in our capacity and precision."
    },
    {
      title: "Comprehensive Product Range",
      desc: `Stay ahead with an extensive portfolio, including:
- Trauma implants (locking plates, cortical & cancellous screws)
- External and internal fixator systems
- Osteotomy plates, non‑union solutions, knee/hip/spine prostheses
- Full spectrum of orthopedic instruments (drills, drill bits, saws, forceps, retractors, mallets, screwdrivers)`
    },
    {
      title: "Custom Branding & Packaging",
      desc: "We offer private-label packaging and dealer branding options. All products are export-ready—packed securely with durable cartons, moisture protection, and your branding prominently displayed."
    },
    {
      title: "Export-Ready Excellence",
      desc: "Certified and compliant with global import regulations, our implants are expertly packaged, labeled, and accompanied by full documentation—ensuring smooth delivery and regulatory clearance worldwide."
    },
    {
      title: "Responsive Global Support",
      desc: "Benefit from a dedicated account manager—your single point of contact for fast communication, technical support, quote management, and after-sales service to address every inquiry with speed and transparency."
    },
    {
      title: "On-Time Shipping & Logistics",
      desc: "Our logistics team meticulously organizes each shipment—early vessel bookings, precise documentation, and reliable Incoterm-based deliveries—to ensure your orders reach you on time and in full."
    },
    {
      title: "Training & Market Support",
      desc: "We support your success with training for your sales and surgical teams, co-branded marketing materials, and educational resources explaining implant usage, indications, and surgical procedures."
    },
    {
      title: "Flexible Dealership Opportunities",
      desc: "Join our global network as an exclusive-area dealer with competitive pricing and margin support. Benefit from strategic growth opportunities and stand out as a trusted partner in your market."
    },
    {
      title: "Long‑Term Partnership Vision",
      desc: "We’re more than a supplier—we’re your advisor and business friend, committed to forging long-lasting relationships built on trust, transparency, performance, and mutual success."
    },
  ];

  return (
    <section className="whyus-wrapper">
      <div className="whyus-header">
        <h2>Discover the Key Reasons Why Our Business Solutions Are Your Best Choice</h2>
      </div>
      <div className="whyus-grid">
        {reasons.map((item, index) => (
          <div className="whyus-card" key={index}>
            <h3>{index + 1}. {item.title}</h3>
            <p>{item.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default WhyUs;
