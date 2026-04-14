'use client';

export default function BootstrapExample() {
  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-md-8 mx-auto">
          <div className="card">
            <div className="card-header bg-primary text-white">
              <h5 className="card-title mb-0">Bootstrap Integration Example</h5>
            </div>
            <div className="card-body">
              <p className="lead">Bootstrap is now integrated into your Next.js project!</p>
              
              <h6 className="mt-4">Example Components:</h6>
              <div className="btn-group mt-3" role="group">
                <button type="button" className="btn btn-primary">Primary</button>
                <button type="button" className="btn btn-success">Success</button>
                <button type="button" className="btn btn-danger">Danger</button>
              </div>

              <div className="alert alert-info mt-4" role="alert">
                You can now use all Bootstrap components and utilities in your project!
              </div>

              <div className="table-responsive mt-4">
                <table className="table table-striped">
                  <thead>
                    <tr>
                      <th>Feature</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>Bootstrap CSS</td>
                      <td><span className="badge bg-success">Active</span></td>
                    </tr>
                    <tr>
                      <td>Bootstrap JS</td>
                      <td><span className="badge bg-success">Active</span></td>
                    </tr>
                    <tr>
                      <td>Tailwind CSS</td>
                      <td><span className="badge bg-success">Active</span></td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
