const { routes } = require('./v2-routes.js');

module.exports = `<div class="v2-backed-by">
    <div class="v2-backed-by-inner">
      <div class="v2-backed-by-group">
        <p class="v2-backed-by-label"><span class="v2-backed-by-dot" aria-hidden="true"></span> Backed by :</p>
        <a class="v2-backed-by-link" href="https://istart.rajasthan.gov.in/profile/8919/startups" target="_blank" rel="noopener noreferrer"><img src="${routes.backedIstart}" alt="iStart · Govt. of Rajasthan Initiative" height="24" loading="lazy"></a>
        <span class="v2-backed-by-divider" aria-hidden="true"></span>
        <a class="v2-backed-by-link" href="https://www.nvidia.com/en-us/startups/" target="_blank" rel="noopener noreferrer"><img class="v2-backed-by-badge" src="${routes.backedNvidia}" alt="NVIDIA Inception Program" height="24" loading="lazy"></a>
      </div>
      <div class="v2-backed-by-group">
        <p class="v2-backed-by-label"><span class="v2-backed-by-dot" aria-hidden="true"></span> Incubated at :</p>
        <a class="v2-backed-by-link" href="https://nsrcel.org/portfolio/" target="_blank" rel="noopener noreferrer"><img src="${routes.backedNsrcel}" alt="NSRCEL · IIM, Bangalore" height="24" loading="lazy"></a>
        <span class="v2-backed-by-divider" aria-hidden="true"></span>
        <a class="v2-backed-by-link" href="https://miic.mnit.ac.in/incubatees" target="_blank" rel="noopener noreferrer"><img src="${routes.backedMiic}" alt="MIIC · MNIT, Jaipur" height="24" loading="lazy"></a>
      </div>
    </div>
  </div>

  <footer class="v2-footer">
    <div class="v2-footer-grid">
      <div class="v2-footer-brand">
        <img class="v2-footer-logo" src="${routes.footerLogo}"
          alt="Revue" width="95" height="32" loading="lazy">
        <p>Creative workflow software for modern creative<br>teams.</p>
      </div>
      <div class="v2-footer-nav">
        <div class="v2-footer-col">
          <h3>Products</h3>
          <a href="${routes.productQa}">Automate Quality<br>Check</a>
          <a href="${routes.productFeedback}">Client Communication</a>
          <a href="${routes.productPm}">Team and Project<br>Management</a>
        </div>
        <div class="v2-footer-col">
          <h3>Industry use cases</h3>
          <a href="${routes.solutionDesign}">Design Teams</a>
          <a href="${routes.solutionMarketing}">Marketing Teams</a>
          <a href="${routes.solutionInhouse}">Internal Teams</a>
        </div>
        <div class="v2-footer-col">
          <h3>Features</h3>
          <a href="${routes.featureCollab}">Collaboration</a>
          <a href="${routes.featureWorkflow}">Workflow</a>
          <a href="${routes.featureApproval}">Approval</a>
          <a href="${routes.featureReview}">Design Review</a>
        </div>
        <div class="v2-footer-col">
          <h3>Resources</h3>
          <a href="${routes.home}">Homepage</a>
          <a href="${routes.blog}">Blogs</a>
          <a href="${routes.pricing}">Pricing</a>
        </div>
      </div>
    </div>
    <div class="v2-footer-bottom">
      <span>© Revue. All rights reserved.</span>
      <nav class="v2-footer-legal" aria-label="Legal">
        <a href="${routes.privacy}">Privacy Policy</a>
        <a href="${routes.terms}">Terms of Service</a>
        <a href="mailto:hello@revuesuite.com">Contact</a>
      </nav>
    </div>
  </footer>`;
