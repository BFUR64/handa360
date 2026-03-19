const panels = document.querySelectorAll(".panel");
const nextButtons = document.querySelectorAll("[data-next]");
const prevButtons = document.querySelectorAll("[data-prev]");
const modeToggle = document.getElementById("modeToggle");
const form = document.getElementById("assessmentForm");
const resultsContainer = document.getElementById("resultsContainer");

const assessmentSteps = document.querySelectorAll(".assessment-step");
const progressSteps = {
  "step-location": document.getElementById("progress-location"),
  "step-hazard": document.getElementById("progress-hazard"),
  "step-needs": document.getElementById("progress-needs"),
  "step-review": document.getElementById("progress-review")
};

const state = {
  location: "",
  hazard: "",
  specialNeeds: []
};

function showPanel(panelId) {
  panels.forEach(function (panel) {
    panel.classList.remove("active");
  });

  const targetPanel = document.getElementById(panelId);

  if (targetPanel) {
    targetPanel.classList.add("active");
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  }
}

function showAssessmentStep(stepId) {
  assessmentSteps.forEach(function (step) {
    step.classList.remove("active");
  });

  Object.values(progressSteps).forEach(function (step) {
    step.classList.remove("active");
  });

  const targetStep = document.getElementById(stepId);
  if (targetStep) {
    targetStep.classList.add("active");
  }

  if (progressSteps[stepId]) {
    progressSteps[stepId].classList.add("active");
  }
}

function updateReview() {
  const reviewLocation = document.getElementById("reviewLocation");
  const reviewHazard = document.getElementById("reviewHazard");
  const reviewNeeds = document.getElementById("reviewNeeds");

  reviewLocation.textContent = state.location || "Not selected";
  reviewHazard.textContent = state.hazard || "Not selected";
  reviewNeeds.textContent =
    state.specialNeeds.length > 0 ? state.specialNeeds.join(", ") : "None selected";
}

function formatLabel(value) {
  const labels = {
    coastal: "Coastal Area",
    lowland: "Lowland / Flood-Prone Area",
    upland: "Upland / Landslide-Prone Area",
    urban: "Urban / Dense Residential Area",
    typhoon: "Typhoon",
    flood: "Flood",
    earthquake: "Earthquake",
    landslide: "Landslide",
    infant: "Infant / Toddler",
    child: "Child",
    pregnant: "Pregnant Person",
    senior: "Senior Citizen",
    pwd: "Person with Disability",
    "chronic-illness": "Chronic Illness"
  };

  return labels[value] || value;
}

nextButtons.forEach(function (button) {
  button.addEventListener("click", function () {
    const nextPanel = button.getAttribute("data-next");
    showPanel(nextPanel);
  });
});

prevButtons.forEach(function (button) {
  button.addEventListener("click", function () {
    const previousPanel = button.getAttribute("data-prev");
    showPanel(previousPanel);
  });
});

modeToggle.addEventListener("click", function () {
  document.body.classList.toggle("bright-mode");

  if (document.body.classList.contains("bright-mode")) {
    modeToggle.textContent = "Matte Mode";
  } else {
    modeToggle.textContent = "Bright Mode";
  }
});

document.querySelectorAll(".option-grid.single-select").forEach(function (group) {
  const groupName = group.getAttribute("data-group");
  const buttons = group.querySelectorAll(".option-button");

  buttons.forEach(function (button) {
    button.addEventListener("click", function () {
      buttons.forEach(function (item) {
        item.classList.remove("selected");
      });

      button.classList.add("selected");
      state[groupName] = button.getAttribute("data-value");
    });
  });
});

document.querySelectorAll(".option-grid.multi-select").forEach(function (group) {
  const buttons = group.querySelectorAll(".option-button");

  buttons.forEach(function (button) {
    button.addEventListener("click", function () {
      const value = button.getAttribute("data-value");
      button.classList.toggle("selected");

      if (button.classList.contains("selected")) {
        if (!state.specialNeeds.includes(value)) {
          state.specialNeeds.push(value);
        }
      } else {
        state.specialNeeds = state.specialNeeds.filter(function (item) {
          return item !== value;
        });
      }
    });
  });
});

document.querySelectorAll(".step-next").forEach(function (button) {
  button.addEventListener("click", function () {
    const nextStep = button.getAttribute("data-next-step");

    if (nextStep === "step-hazard" && !state.location) {
      alert("Please select a location first.");
      return;
    }

    if (nextStep === "step-needs" && !state.hazard) {
      alert("Please select a hazard first.");
      return;
    }

    showAssessmentStep(nextStep);
  });
});

document.querySelectorAll(".step-back").forEach(function (button) {
  button.addEventListener("click", function () {
    const prevStep = button.getAttribute("data-prev-step");
    showAssessmentStep(prevStep);
  });
});

document.getElementById("goToReview").addEventListener("click", function () {
  if (!state.location) {
    alert("Please select a location first.");
    showAssessmentStep("step-location");
    return;
  }

  if (!state.hazard) {
    alert("Please select a hazard first.");
    showAssessmentStep("step-hazard");
    return;
  }

  state.location = formatLabel(state.location);
  state.hazard = formatLabel(state.hazard);
  state.specialNeeds = state.specialNeeds.map(formatLabel);

  updateReview();
  showAssessmentStep("step-review");
});

document.querySelectorAll(".review-edit").forEach(function (button) {
  button.addEventListener("click", function () {
    const editStep = button.getAttribute("data-edit-step");
    showAssessmentStep(editStep);
  });
});

form.addEventListener("submit", function (event) {
  event.preventDefault();

  resultsContainer.innerHTML = `
    <article class="result-card">
      <h3>Scenario Summary</h3>
      <p><strong>Location:</strong> ${state.location || "Not selected"}</p>
      <p><strong>Hazard:</strong> ${state.hazard || "Not selected"}</p>
      <p><strong>Special Needs:</strong> ${
        state.specialNeeds.length > 0 ? state.specialNeeds.join(", ") : "None selected"
      }</p>
    </article>

    <article class="result-card">
      <h3>Before / During / After</h3>
      <p>Preparedness instructions will be connected here once your rule engine is added.</p>
    </article>

    <article class="result-card">
      <h3>Emergency Kit</h3>
      <p>Suggested go-bag items will appear here based on the selected profile.</p>
    </article>

    <article class="result-card">
      <h3>Actions</h3>
      <div class="result-actions">
        <button class="btn btn-secondary" type="button" onclick="window.print()">Print</button>
        <button class="btn btn-secondary" type="button">Save</button>
      </div>
    </article>
  `;

  showPanel("panel-results");
});

showAssessmentStep("step-location");