const PrivacyPolicyPage = ({ darkMode }) => {
  return (
    <div className={`privacy-policy-page py-4 ${darkMode ? "bg-dark text-light" : "bg-light"}`}>
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-8">
            {/* Header */}
            <div className="text-center mb-5 animate-fade-in">
              <h1 className="display-5 fw-bold mb-3">🔒 Privacy Policy</h1>
              <p className="lead text-muted">Last updated: January 1, 2024</p>
            </div>

            <div className="card border-0 shadow-lg animate-fade-in-up">
              <div className="card-body p-5">
                <div className="mb-4">
                  <h3 className="fw-bold mb-3">Introduction</h3>
                  <p>
                    JanSanket India ("we," "our," or "us") operates in compliance with India's Digital Personal Data Protection Act, 2023. 
                    This Privacy Policy explains how we collect, use, and protect your information on our disaster management platform.
                  </p>
                </div>

                <div className="mb-4">
                  <h3 className="fw-bold mb-3">Information We Collect</h3>

                  <h5 className="fw-bold mb-2">Personal Information</h5>
                  <ul>
                    <li>Name, email, and Indian mobile numbers (+91)</li>
                    <li>Aadhaar (for verified volunteers, when required)</li>
                    <li>Location data including GPS and Indian addresses</li>
                    <li>Emergency contacts and local references</li>
                    <li>Volunteer skills and NDMA certifications</li>
                  </ul>

                  <h5 className="fw-bold mb-2">Disaster Information</h5>
                  <ul>
                    <li>Location coordinates with Indian geocoding</li>
                    <li>Disaster reports in local languages</li>
                    <li>State/District-level impact assessments</li>
                  </ul>
                </div>

                <div className="mb-4">
                  <h3 className="fw-bold mb-3">How We Use Your Information</h3>
                  <ul>
                    <li><strong>NDMA Coordination:</strong> Share data with National Disaster Management Authority and State Disaster Response Forces</li>
                    <li><strong>Local Alerts:</strong> Send disaster warnings in regional languages</li>
                    <li><strong>Volunteer Deployment:</strong> Match with local NGOs and government agencies</li>
                    <li><strong>PM Cares Integration:</strong> For national-level disaster responses</li>
                    <li><strong>Digital India Compliance:</strong> Follow MeitY guidelines for data governance</li>
                  </ul>
                </div>

                <div className="mb-4">
                  <h3 className="fw-bold mb-3">Data Sharing</h3>
                  <p>We share information with:</p>
                  <ul>
                    <li>NDMA and SDRF teams during active disasters</li>
                    <li>Registered NGOs like Indian Red Cross and SEEDS</li>
                    <li>Local administration and district authorities</li>
                    <li>Verified volunteers in your area during emergencies</li>
                  </ul>
                </div>

                <div className="mb-4">
                  <h3 className="fw-bold mb-3">Your Rights Under DPDPA 2023</h3>
                  <ul>
                    <li><strong>Right to Access:</strong> Request your data copy</li>
                    <li><strong>Right to Correction:</strong> Update inaccurate information</li>
                    <li><strong>Right to Erasure:</strong> Delete non-essential data</li>
                    <li><strong>Right to Grievance Redressal:</strong> Contact our Data Protection Officer</li>
                  </ul>
                </div>

                <div className="mb-4">
                  <h3 className="fw-bold mb-3">Data Storage</h3>
                  <p>We store data in India with:</p>
                  <ul>
                    <li>IRNSS-based location services</li>
                    <li>MeitY-approved data centers</li>
                    <li>Local language support (Hindi + 21 other scheduled languages)</li>
                  </ul>
                </div>

                <div className="mb-4">
                  <h3 className="fw-bold mb-3">Emergency Protocols</h3>
                  <div className="alert alert-warning">
                    <p>
                      During national disasters (L3/L2 alerts), we may share data with:
                    </p>
                    <ul>
                      <li>NDRF teams and State Control Rooms</li>
                      <li>District Magistrates and local police</li>
                      <li>EMRI 108 ambulance services</li>
                    </ul>
                  </div>
                </div>

                <div className="mb-4">
                  <h3 className="fw-bold mb-3">Contact Information</h3>
                  <ul className="list-unstyled">
                    <li><strong>Data Protection Officer:</strong> dpo@JanSanketindia.in</li>
                    <li><strong>24x7 Helpline:</strong> 1800-123-HELP (4357)</li>
                    <li><strong>Registered Office:</strong> 
                      <br />
                      JanSanket India, 
                      <br />
                      C/O National Institute of Disaster Management,
                      <br />
                      IIPA Campus, IP Estate, New Delhi - 110002
                    </li>
                  </ul>
                </div>

                <div className="alert alert-info">
                  <h5 className="fw-bold">भारतीय आपदा प्रतिक्रिया नेटवर्क</h5>
                  <p className="mb-0">
                    This platform is part of the National Disaster Management Plan's community engagement framework.
                    Your participation helps build India's disaster resilience.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PrivacyPolicyPage