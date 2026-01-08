import { useNavigate } from "react-router-dom"
const AboutPage = ({ darkMode }) => {
  const navigate = useNavigate()
  const teamMembers = [
    {
      name: "Sarjan Shah",
      role: "Project Lead & Developer",
      photo: "👨‍💻",
      bio: "Full-stack developer driving the technical vision and implementation.",
      specialties: ["React", "Django", "API Integration"],
    },
    {
      name: "Sneh Patel",
      role: "Backend Engineer",
      photo: "👩‍💻",
      bio: "Focused on backend architecture, APIs, and data management.",
      specialties: ["Python", "Django REST Framework", "Database Design"],
    },
    {
      name: "Mahi Gajjar",
      role: "Frontend Engineer",
      photo: "👩‍🎨",
      bio: "Designs and builds engaging UI/UX for seamless user experiences.",
      specialties: ["React", "CSS", "Responsive Design"],
    },
    {
      name: "Charmi Parajiya",
      role: "Operations & Community Manager",
      photo: "👩‍💼",
      bio: "Coordinates volunteer efforts and community outreach to maximize impact.",
      specialties: ["Project Management", "Community Building", "Volunteer Coordination"],
    },
  ];

  const milestones = [
    {
      year: "2022",
      title: "JanSanket India Launched",
      description: "Started as a student project addressing disaster response gaps in India.",
      icon: "🇮🇳",
    },
    {
      year: "2023",
      title: "First Major Flood Response",
      description: "Helped coordinate relief efforts during Kerala floods, reaching thousands.",
      icon: "🌊",
    },
    {
      year: "2024",
      title: "Statewide Expansion",
      description: "Extended coverage to multiple Indian states with local shelter networks.",
      icon: "🗺️",
    },
    {
      year: "2025",
      title: "Integration with Government Agencies",
      description: "Partnered with local disaster management authorities for real-time alerts.",
      icon: "🤝",
    },
  ];

  const stats = [
    { number: "5L+", label: "Lives Impacted", icon: "❤️" },
    { number: "10K+", label: "Volunteers", icon: "👥" },
    { number: "1K+", label: "Shelters", icon: "🏠" },
    { number: "200+", label: "Disasters Responded", icon: "🚨" },
  ];

  return (
    <div className={`about-page py-4 ${darkMode ? "bg-dark text-light" : "bg-light"}`}>
      <div className="container">
        {/* Hero Section */}
        <div className="text-center mb-5 animate-fade-in">
          <h1 className="display-4 fw-bold mb-4">Our Mission: Empowering India’s Resilience</h1>
          <p className="lead mb-4">
            JanSanket India is dedicated to connecting communities, volunteers, and authorities to
            save lives and speed recovery when disaster strikes across our diverse nation.
          </p>
          <div className="row justify-content-center">
            <div className="col-lg-8">
              <div className="card border-0 shadow-lg">
                <div className="card-body p-5">
                  <h3 className="mb-3">🎯 Our Vision</h3>
                  <p className="lead">
                    To build a disaster-ready India where technology strengthens local communities,
                    ensuring help reaches every vulnerable corner swiftly and efficiently.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Section */}
        <div className="row mb-5 animate-fade-in-up">
          {stats.map((stat, index) => (
            <div key={index} className="col-lg-3 col-md-6 mb-4">
              <div className="card card-hover h-100 border-0 shadow-lg text-center">
                <div className="card-body p-4">
                  <div className="display-4 mb-3">{stat.icon}</div>
                  <h2 className="stats-counter text-primary">{stat.number}</h2>
                  <h6 className="text-muted">{stat.label}</h6>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Story Section */}
        <div className="row mb-5 animate-slide-in-left">
          <div className="col-lg-6 mb-4">
            <div className="card border-0 shadow-lg h-100">
              <div className="card-body p-5">
                <h3 className="mb-4">📖 Our Story</h3>
                <p className="mb-3">
                  JanSanket India began as a college project when Sarjan Shah and team noticed critical gaps in
                  disaster communication during monsoon floods and cyclones. From Mumbai to Assam, the need to connect
                  affected people with volunteers and shelters was urgent.
                </p>
                <p className="mb-3">
                  “India’s diversity and geography demand localized, tech-driven solutions that empower communities,” says Sarjan.
                </p>
                <p className="mb-0">
                  Today, we are a growing network of volunteers, developers, and disaster experts committed to
                  making disaster response faster, smarter, and more inclusive across India.
                </p>
              </div>
            </div>
          </div>
          <div className="col-lg-6 mb-4">
            <div className="card border-0 shadow-lg h-100">
              <div className="card-body p-5">
                <h3 className="mb-4">🌟 Our Values</h3>
                <div className="mb-3">
                  <h6 className="fw-bold">🚀 Speed & Efficiency</h6>
                  <p className="small text-muted">
                    Every minute counts in India’s disaster zones. We optimize rapid, reliable response.
                  </p>
                </div>
                <div className="mb-3">
                  <h6 className="fw-bold">🤝 Community First</h6>
                  <p className="small text-muted">
                    Indian communities are resilient and resourceful. We empower local voices.
                  </p>
                </div>
                <div className="mb-3">
                  <h6 className="fw-bold">🔒 Trust & Transparency</h6>
                  <p className="small text-muted">
                    Verified data is essential in India’s complex emergency landscape.
                  </p>
                </div>
                <div className="mb-3">
                  <h6 className="fw-bold">🌍 Inclusive Access</h6>
                  <p className="small text-muted">
                    We ensure help reaches all, across languages, regions, and technology divides.
                  </p>
                </div>
                <div className="mb-0">
                  <h6 className="fw-bold">💡 Innovation for Good</h6>
                  <p className="small text-muted">
                    Harnessing India’s tech talent to solve humanitarian challenges.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Timeline */}
        <div className="mb-5 animate-fade-in-up">
          <h2 className="text-center mb-5">🏆 Our Journey</h2>
          <div className="row">
            {milestones.map((milestone, index) => (
              <div key={index} className="col-lg-6 col-md-6 mb-4">
                <div className="card card-hover border-0 shadow-lg h-100">
                  <div className="card-body p-4 text-center">
                    <div className="display-4 mb-3">{milestone.icon}</div>
                    <div className="badge bg-primary mb-3">{milestone.year}</div>
                    <h5 className="fw-bold mb-3">{milestone.title}</h5>
                    <p className="text-muted">{milestone.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Team Section */}
        <div className="mb-5 animate-slide-in-right">
          <h2 className="text-center mb-5">👥 Meet Our Team</h2>
          <div className="row">
            {teamMembers.map((member, index) => (
              <div key={index} className="col-lg-6 col-md-6 mb-4">
                <div className="card card-hover border-0 shadow-lg h-100">
                  <div className="card-body p-4 text-center">
                    <div
                      className="bg-primary rounded-circle mx-auto mb-3 d-flex align-items-center justify-content-center"
                      style={{ width: "80px", height: "80px", fontSize: "32px" }}
                    >
                      {member.photo}
                    </div>
                    <h5 className="fw-bold mb-1">{member.name}</h5>
                    <p className="text-primary mb-3">{member.role}</p>
                    <p className="text-muted mb-3">{member.bio}</p>
                    <div className="d-flex flex-wrap justify-content-center gap-1">
                      {member.specialties.map((specialty, idx) => (
                        <span key={idx} className="badge bg-secondary small">
                          {specialty}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Impact Section */}
        <div className="card border-0 shadow-lg mb-5 animate-fade-in-up">
          <div className="card-body p-5">
            <div className="row align-items-center">
              <div className="col-lg-6 mb-4">
                <h3 className="mb-4">🌍 Global Impact with Indian Roots</h3>
                <p className="mb-3">
                  Since launching in India, JanSanket has empowered communities across diverse regions — from
                  Himalayan foothills to coastal villages — to prepare, respond, and recover from natural disasters.
                </p>
                <div className="row">
                  <div className="col-6 mb-3">
                    <div className="text-center">
                      <h4 className="text-success">98%</h4>
                      <small className="text-muted">Response Time Improvement</small>
                    </div>
                  </div>
                  <div className="col-6 mb-3">
                    <div className="text-center">
                      <h4 className="text-info">24/7</h4>
                      <small className="text-muted">Emergency Monitoring</small>
                    </div>
                  </div>
                  <div className="col-6 mb-3">
                    <div className="text-center">
                      <h4 className="text-warning">15 min</h4>
                      <small className="text-muted">Average Response Time</small>
                    </div>
                  </div>
                  <div className="col-6 mb-3">
                    <div className="text-center">
                      <h4 className="text-danger">99.9%</h4>
                      <small className="text-muted">Platform Uptime</small>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-lg-6 mb-4">
                <div className="bg-light rounded-3 p-4 text-center">
                  <h4 className="mb-3">🏆 Recognition</h4>
                  <div className="mb-3">
                    <span className="badge bg-warning mb-2">🥇 NITI Aayog Innovation Award 2024</span>
                    <br />
                    <span className="badge bg-info mb-2">🏅 Indian Red Cross Society Partnership</span>
                    <br />
                    <span className="badge bg-success mb-2">⭐ National Disaster Management Authority Collaboration</span>
                    <br />
                    <span className="badge bg-primary mb-2">🌟 Startup India Grant Recipient</span>
                  </div>
                  <p className="small text-muted">
                    Recognized by Indian governmental and humanitarian organizations for excellence in disaster tech.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center animate-fade-in-up">
          <div className="card border-0 shadow-lg">
            <div className="card-body p-5">
              <h3 className="mb-3">🚀 Join Our Mission</h3>
              <p className="lead mb-4">
                Whether you’re a developer, emergency responder, community leader, or someone who simply wants to help,
                there’s a place for you in the JanSanket India community.
              </p>
              <div className="d-flex flex-wrap justify-content-center gap-3">
                <button className="btn btn-primary btn-lg btn-animated" onClick={() => navigate("/volunteer-application")}>🤝 Become a Volunteer</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
