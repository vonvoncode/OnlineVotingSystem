const positions = ["President", "Vice President", "Secretary", "Treasurer"];

const candidates = [
  { id: "presA", position: "President", name: "Miguel Reyes", party: "Bagong Alyansa", platform: "Push for extended library hours and a student wellness room.", img: "files/candidate1.jpg" },
  { id: "presB", position: "President", name: "Jasmine Santos", party: "Unang Hakbang Party", platform: "Launch a peer-tutoring program and clearer grievance channels.", img: "files/candidate2.jpg" },
  { id: "presC", position: "President", name: "Aaron Lim", party: "Independent", platform: "Focus on transparent budgeting for student org funds.", img: "files/candidate3.jpg" },

  { id: "vpA", position: "Vice President", name: "Kyla Domingo", party: "Bagong Alyansa", platform: "Coordinate inter-club events and a shared activities calendar.", img: "files/candidate4.jpg" },
  { id: "vpB", position: "Vice President", name: "Rafael Torres", party: "Unang Hakbang Party", platform: "Improve communication between CSG and homeroom reps.", img: "files/candidate5.jpg" },
  { id: "vpC", position: "Vice President", name: "Nicole Fajardo", party: "Independent", platform: "Advocate for flexible study breaks during exam weeks.", img: "files/candidate6.jpg" },

  { id: "secA", position: "Secretary", name: "Ethan Bautista", party: "Bagong Alyansa", platform: "Digitize meeting minutes and publish them for all students.", img: "files/candidate7.jpg" },
  { id: "secB", position: "Secretary", name: "Patricia Cruz", party: "Unang Hakbang Party", platform: "Set up an online suggestion box reviewed monthly.", img: "files/candidate8.jpg" },
  { id: "secC", position: "Secretary", name: "Gabriel Mendoza", party: "Independent", platform: "Streamline permit and event-request paperwork.", img: "files/candidate9.jpg" },

  { id: "treA", position: "Treasurer", name: "Lara Villanueva", party: "Bagong Alyansa", platform: "Publish a quarterly, plain-language budget report.", img: "files/candidate10.jpg" },
  { id: "treB", position: "Treasurer", name: "Timothy Sy", party: "Unang Hakbang Party", platform: "Introduce low-cost fundraising alternatives to reduce fees.", img: "files/candidate11.jpg" },
  { id: "treC", position: "Treasurer", name: "Winona Herrera", party: "Independent", platform: "Audit past org expenses and share findings publicly.", img: "files/candidate12.jpg" },
];

let votes = {
  presA: 4, presB: 3, presC: 1,
  vpA: 3, vpB: 4, vpC: 2,
  secA: 2, secB: 5, secC: 1,
  treA: 3, treB: 2, treC: 3,
};

const seedVotes = { ...votes };
let currentVoter = null;
let hasVoted = false;

const loginForm = document.getElementById("loginForm");
const loginScreen = document.getElementById("loginScreen");
const appContent = document.getElementById("appContent");
const navVoterTag = document.getElementById("navVoterTag");

loginForm.addEventListener("submit", function (e) {
  e.preventDefault();

  const idField = document.getElementById("loginId");
  const nameField = document.getElementById("loginName");
  const courseField = document.getElementById("loginCourse");

  const idVal = idField.value.trim();
  const nameVal = nameField.value.trim();
  const courseVal = courseField.value.trim();

  let valid = true;
  valid = validateField(idField, "err-loginId", idVal !== "", "Student ID is required.") && valid;
  valid = validateField(nameField, "err-loginName", nameVal !== "", "Full name is required.") && valid;
  valid = validateField(courseField, "err-loginCourse", courseVal !== "", "Grade & section is required.") && valid;

  if (!valid) return;

  currentVoter = { id: idVal, name: nameVal, course: courseVal };

  loginScreen.classList.add("hidden");
  appContent.classList.remove("hidden");
  navVoterTag.textContent = "Verified: " + firstName(nameVal);

  renderVoterSummary();
});

function validateField(inputEl, errId, isValid, message) {
  const errEl = document.getElementById(errId);
  if (!isValid) {
    inputEl.classList.add("invalid");
    errEl.textContent = message;
    return false;
  }
  inputEl.classList.remove("invalid");
  errEl.textContent = "";
  return true;
}

function firstName(fullName) {
  return fullName.split(/[\s,]+/)[0] || fullName;
}

const navToggle = document.getElementById("navToggle");
const siteNav = document.getElementById("siteNav");

navToggle.addEventListener("click", function () {
  const isOpen = siteNav.classList.toggle("open");
  navToggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
});

siteNav.querySelectorAll(".nav-link").forEach(function (link) {
  link.addEventListener("click", function () {
    siteNav.classList.remove("open");
    navToggle.setAttribute("aria-expanded", "false");
  });
});

const darkToggle = document.getElementById("darkToggle");

darkToggle.addEventListener("click", function () {
  document.body.classList.toggle("dark");
  darkToggle.textContent = document.body.classList.contains("dark") ? "☀️" : "🌙";
});

const candidateAccordion = document.getElementById("candidateAccordion");

function buildCandidateAccordion() {
  candidateAccordion.innerHTML = "";

  positions.forEach(function (position, index) {
    const group = candidates.filter(function (c) { return c.position === position; });

    const item = document.createElement("div");
    item.className = "accordion-item" + (index === 0 ? " open" : "");

    const header = document.createElement("button");
    header.type = "button";
    header.className = "accordion-header";
    header.innerHTML = "<span>" + position + "</span><span class='chevron'>+</span>";
    header.addEventListener("click", function () { toggleAccordion(item); });

    const panel = document.createElement("div");
    panel.className = "accordion-panel";

    const inner = document.createElement("div");
    inner.className = "accordion-panel-inner";

    const grid = document.createElement("div");
    grid.className = "candidate-grid";

    group.forEach(function (c) {
      const card = document.createElement("div");
      card.className = "candidate-card";
      card.innerHTML =
        "<img src='" + c.img + "' alt='Photo of " + c.name + "'>" +
        "<h4>" + c.name + "</h4>" +
        "<div class='candidate-party'>" + c.party + "</div>" +
        "<p class='candidate-platform'>" + c.platform + "</p>";
      grid.appendChild(card);
    });

    inner.appendChild(grid);
    panel.appendChild(inner);
    item.appendChild(header);
    item.appendChild(panel);
    candidateAccordion.appendChild(item);
  });
}

function toggleAccordion(item) {
  item.classList.toggle("open");
}

const voterSummary = document.getElementById("voterSummary");
const voteGroups = document.getElementById("voteGroups");

function renderVoterSummary() {
  if (!currentVoter) return;
  voterSummary.innerHTML =
    "Voting as <strong>" + escapeHtml(currentVoter.name) + "</strong> &middot; ID " +
    escapeHtml(currentVoter.id) + " &middot; " + escapeHtml(currentVoter.course);
}

function buildVoteGroups() {
  voteGroups.innerHTML = "";

  positions.forEach(function (position) {
    const group = candidates.filter(function (c) { return c.position === position; });
    const fieldKey = "position-" + position.replace(/\s+/g, "-").toLowerCase();

    const wrap = document.createElement("div");
    wrap.className = "vote-group";
    wrap.setAttribute("data-position", position);

    const heading = document.createElement("h3");
    heading.textContent = position;
    wrap.appendChild(heading);

    group.forEach(function (c) {
      const optionLabel = document.createElement("label");
      optionLabel.className = "vote-option";
      optionLabel.setAttribute("for", c.id);

      optionLabel.innerHTML =
        "<input type='radio' name='" + fieldKey + "' id='" + c.id + "' value='" + c.id + "'>" +
        "<span>" + c.name + " <span class='opt-party'>&middot; " + c.party + "</span></span>";

      wrap.appendChild(optionLabel);
    });

    voteGroups.appendChild(wrap);
  });

  voteGroups.querySelectorAll("input[type='radio']").forEach(function (radio) {
    radio.addEventListener("change", function () {
      const groupWrap = radio.closest(".vote-group");
      groupWrap.querySelectorAll(".vote-option").forEach(function (opt) {
        opt.classList.remove("selected");
      });
      radio.closest(".vote-option").classList.add("selected");
    });
  });
}

const voteForm = document.getElementById("voteForm");
const errVote = document.getElementById("err-vote");
const confirmModal = document.getElementById("confirmModal");
const modalList = document.getElementById("modalList");
const modalCancel = document.getElementById("modalCancel");
const modalConfirm = document.getElementById("modalConfirm");
const confirmationBox = document.getElementById("confirmation");
const confirmationList = document.getElementById("confirmationList");
const submitVoteBtn = document.getElementById("submitVoteBtn");

let pendingSelections = null;

voteForm.addEventListener("submit", function (e) {
  e.preventDefault();
  errVote.textContent = "";

  if (hasVoted) {
    errVote.textContent = "You have already submitted a vote in this session.";
    return;
  }

  const selections = {};
  let missing = [];

  positions.forEach(function (position) {
    const fieldKey = "position-" + position.replace(/\s+/g, "-").toLowerCase();
    const checked = voteForm.querySelector("input[name='" + fieldKey + "']:checked");
    if (!checked) {
      missing.push(position);
    } else {
      selections[position] = checked.value;
    }
  });

  if (missing.length > 0) {
    errVote.textContent = "Please select a candidate for: " + missing.join(", ") + ".";
    return;
  }

  pendingSelections = selections;
  showConfirmModal(selections);
});

function showConfirmModal(selections) {
  modalList.innerHTML = "";
  positions.forEach(function (position) {
    const candidateId = selections[position];
    const candidate = candidates.find(function (c) { return c.id === candidateId; });
    const li = document.createElement("li");
    li.innerHTML = "<span>" + position + "</span><span>" + candidate.name + "</span>";
    modalList.appendChild(li);
  });
  confirmModal.classList.remove("hidden");
}

modalCancel.addEventListener("click", function () {
  confirmModal.classList.add("hidden");
});

modalConfirm.addEventListener("click", function () {
  confirmModal.classList.add("hidden");
  finalizeVote(pendingSelections);
});

function finalizeVote(selections) {
  Object.keys(selections).forEach(function (position) {
    const candidateId = selections[position];
    votes[candidateId] = (votes[candidateId] || 0) + 1;
  });

  hasVoted = true;

  confirmationList.innerHTML = "";
  positions.forEach(function (position) {
    const candidateId = selections[position];
    const candidate = candidates.find(function (c) { return c.id === candidateId; });
    const li = document.createElement("li");
    li.innerHTML = "<span>" + position + "</span><span>" + candidate.name + "</span>";
    confirmationList.appendChild(li);
  });

  confirmationBox.classList.remove("hidden");
  voteForm.classList.add("hidden");
  submitVoteBtn.disabled = true;

  renderResults();
  confirmationBox.scrollIntoView({ behavior: "smooth", block: "start" });
}

const resetElectionBtn = document.getElementById("resetElectionBtn");

resetElectionBtn.addEventListener("click", function () {
  const ok = window.confirm("Reset the demo election? This clears the current session's vote and restores the seed tally.");
  if (!ok) return;

  votes = { ...seedVotes };
  hasVoted = false;

  voteForm.reset();
  voteForm.classList.remove("hidden");
  voteGroups.querySelectorAll(".vote-option.selected").forEach(function (opt) {
    opt.classList.remove("selected");
  });
  confirmationBox.classList.add("hidden");
  submitVoteBtn.disabled = false;
  errVote.textContent = "";

  renderResults();
});

const resultsAccordion = document.getElementById("resultsAccordion");
const totalVotesCount = document.getElementById("totalVotesCount");

function renderResults() {
  resultsAccordion.innerHTML = "";
  let grandTotal = 0;

  positions.forEach(function (position, index) {
    const group = candidates.filter(function (c) { return c.position === position; });
    const positionTotal = group.reduce(function (sum, c) { return sum + votes[c.id]; }, 0);
    grandTotal += positionTotal;

    const highestCount = Math.max.apply(null, group.map(function (c) { return votes[c.id]; }));

    const item = document.createElement("div");
    item.className = "accordion-item" + (index === 0 ? " open" : "");

    const header = document.createElement("button");
    header.type = "button";
    header.className = "accordion-header";
    header.innerHTML = "<span>" + position + "</span><span class='chevron'>+</span>";
    header.addEventListener("click", function () { toggleAccordion(item); });

    const panel = document.createElement("div");
    panel.className = "accordion-panel";
    const inner = document.createElement("div");
    inner.className = "accordion-panel-inner";

    group
      .slice()
      .sort(function (a, b) { return votes[b.id] - votes[a.id]; })
      .forEach(function (c) {
        const count = votes[c.id];
        const pct = positionTotal > 0 ? (count / positionTotal) * 100 : 0;
        const isWinner = count === highestCount && count > 0;

        const row = document.createElement("div");
        row.className = "result-row";
        row.innerHTML =
          "<div class='result-row-top" + (isWinner ? " winner" : "") + "'>" +
            "<span class='r-name'>" + c.name + "</span>" +
            "<span class='r-stats'>" + count + " votes &middot; " + pct.toFixed(1) + "%</span>" +
          "</div>" +
          "<div class='bar-track'><div class='bar-fill' style='width:0%' data-target='" + pct + "'></div></div>";

        inner.appendChild(row);
      });

    panel.appendChild(inner);
    item.appendChild(header);
    item.appendChild(panel);
    resultsAccordion.appendChild(item);
  });

  totalVotesCount.textContent = grandTotal;

  requestAnimationFrame(function () {
    resultsAccordion.querySelectorAll(".bar-fill").forEach(function (bar) {
      bar.style.width = bar.getAttribute("data-target") + "%";
    });
  });
}

function escapeHtml(str) {
  const div = document.createElement("div");
  div.textContent = str;
  return div.innerHTML;
}

buildCandidateAccordion();
buildVoteGroups();
renderResults();
