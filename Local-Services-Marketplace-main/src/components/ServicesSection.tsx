export default function ServicesSection() {
  const services = [
    { icon: "🏠", name: "Home Care", description: "Cleaning, repairs & maintenance" },
    { icon: "💪", name: "Wellness", description: "Fitness, yoga & health" },
    { icon: "📚", name: "Education", description: "Tutoring & coaching classes" },
    { icon: "🎉", name: "Events", description: "Planning & photography services" },
    { icon: "🚗", name: "Auto", description: "Detailing & maintenance" },
    { icon: "💻", name: "Tech", description: "Web design & development" },
    { icon: "💇", name: "Beauty", description: "Hair, makeup & wellness" },
    { icon: "🍳", name: "Food & Catering", description: "Cooking & event catering" }
  ];

  return (
    <section className="py-5">
      <div className="container">
        <div className="text-center mb-5">
          <h2 className="h3 fw-bold mb-2">Browse by Service Category</h2>
          <p className="text-muted lead">Find exactly what you're looking for</p>
        </div>

        <div className="row g-3">
          {services.map((service, idx) => (
            <div key={idx} className="col-12 col-sm-6 col-lg-3">
              <a href="#" className="text-decoration-none">
                <div className="card border-0 shadow-sm h-100 text-center transition" style={{ cursor: "pointer" }}>
                  <div className="card-body">
                    <div className="h1 mb-3">{service.icon}</div>
                    <h5 className="card-title fw-bold text-dark">{service.name}</h5>
                    <p className="text-muted small mb-3">{service.description}</p>
                    <a href="#" className="btn btn-sm btn-outline-primary">
                      Browse
                    </a>
                  </div>
                </div>
              </a>
            </div>
          ))}
        </div>

        <div className="row mt-5">
          <div className="col-12">
            <div className="card border-0 bg-primary text-white">
              <div className="card-body text-center py-5">
                <h3 className="fw-bold mb-3">Don't see your service?</h3>
                <p className="mb-4">Post a custom request and get quotes from local pros instantly</p>
                <button className="btn btn-light btn-lg">
                  Post a Custom Request
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .transition {
          transition: all 0.3s ease;
        }
        .transition:hover {
          transform: translateY(-5px);
          box-shadow: 0 8px 16px rgba(0, 0, 0, 0.15) !important;
        }
      `}</style>
    </section>
  );
}
