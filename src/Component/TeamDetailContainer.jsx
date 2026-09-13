import React, { useEffect, useState } from "react";
import { Container, Spinner } from "react-bootstrap";
import TeamDetail from "./TeamDetail";
import config from "../Constants/config";
import axios from "axios";

// Map DB category values → Nepali labels
const CATEGORY_LABELS = {
  'board-of-directors':          'संचालक समिति',
  'account-committee':           'लेखा साखा',
  'account-comittee':            'लेखा साखा',           // backward-compat typo
  'risk-management-committee':   'बिपद् व्यवस्थापन उप-समिति',
  'loan-committee':              'ऋण उप-समिति',
  'education-committee':         'शिक्षा उप-समिति',
  'advisory-committee':          'सल्लाहकार समिति',
  'employees':                   'कर्मचारी',
};

function getCategoryLabel(slug) {
  return CATEGORY_LABELS[slug] ||
    slug.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase());
}

function TeamDetailContainer() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading]       = useState(true);

  useEffect(() => {
    axios.get(`${config.baseUrl}/teamDetail/categories`)
      .then(res => setCategories(res.data))
      .catch(err => console.error("Failed to load categories", err))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="text-center py-5">
        <Spinner animation="border" variant="success" />
      </div>
    );
  }

  if (categories.length === 0) {
    return (
      <p className="text-center text-muted py-5">
        No team information available yet.
      </p>
    );
  }

  return (
    <Container className="py-4">
      {categories.map((cat, idx) => (
        <div key={cat} className="mb-5">
          {/* Section heading */}
          <h5
            className="mb-3 fw-bold"
            style={{
              color: '#002B5B',
              borderLeft: '4px solid #28A745',
              paddingLeft: '10px',
            }}
          >
            {getCategoryLabel(cat)}
          </h5>

          {/* Member list table */}
          <TeamDetail type={cat} />
        </div>
      ))}
    </Container>
  );
}

export default TeamDetailContainer;
