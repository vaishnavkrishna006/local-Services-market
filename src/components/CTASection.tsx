'use client';

import Link from 'next/link';

export default function CTASection() {
  return (
    <section className="py-5" style={{ background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)' }}>
      <div className="container">
        <div className="row">
          <div className="col-lg-8 mx-auto text-center text-white">
            <h2 className="h2 fw-bold mb-4">Ready to Get Started?</h2>
            <p className="lead mb-4">Join thousands of satisfied customers finding trusted local services.</p>
            <div className="d-flex gap-3 justify-content-center flex-wrap">
              <Link href="/listings" className="btn btn-light btn-lg px-4">
                Browse Services
              </Link>
              <Link href="/register" className="btn btn-outline-light btn-lg px-4">
                Sign Up Now
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
