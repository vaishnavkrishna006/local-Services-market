export default function CitiesSection() {
  const cities = [
    { name: "Mumbai", state: "Maharashtra", services: "2,450+" },
    { name: "Bangalore", state: "Karnataka", services: "1,890+" },
    { name: "Delhi", state: "Delhi", services: "2,180+" },
    { name: "Pune", state: "Maharashtra", services: "1,240+" },
    { name: "Hyderabad", state: "Telangana", services: "1,560+" },
    { name: "Chennai", state: "Tamil Nadu", services: "980+" },
    { name: "Kolkata", state: "West Bengal", services: "750+" },
    { name: "Ahmedabad", state: "Gujarat", services: "890+" },
    { name: "Jaipur", state: "Rajasthan", services: "620+" }
  ];

  return (
    <section className="py-5" style={{ backgroundColor: "#f8f9fa" }}>
      <div className="container">
        <div className="text-center mb-5">
          <h2 className="h3 fw-bold mb-2">Available in Major Cities</h2>
          <p className="text-muted lead">Find trusted local pros in your area</p>
        </div>

        <div className="row g-3">
          {cities.map((city, idx) => (
            <div key={idx} className="col-12 col-sm-6 col-lg-4">
              <a href="#" className="text-decoration-none">
                <div className="card border-0 shadow-sm h-100 transition" style={{ cursor: "pointer" }}>
                  <div className="card-body text-center">
                    <h5 className="card-title fw-bold text-dark">{city.name}</h5>
                    <p className="text-muted small mb-2">{city.state}</p>
                    <p className="fw-semibold text-primary">{city.services} services</p>
                  </div>
                  <div className="card-footer bg-light border-0 text-center">
                    <small className="text-primary">Explore →</small>
                  </div>
                </div>
              </a>
            </div>
          ))}
        </div>

        <div className="text-center mt-5">
          <button className="btn btn-outline-primary btn-lg">
            View All Cities
          </button>
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
