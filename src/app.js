const App = (function() {
  const instanceMethods = function() {
    let curriculumVitaeFromFile;
    let configuration;
    let databaseReference;

    const configurationPath = "config.json";
    const loadingComponentNode = document.querySelector("cuoore-loading");
    const successComponentNode = document.querySelector("cuoore-success");
    const processRunningComponentNode = document.querySelector(
      "cuoore-process-running"
    );

    function showLoading() {
      loadingComponentNode.setAttribute("running", true);
    }

    function hideLoading() {
      loadingComponentNode.removeAttribute("running");
    }

    function setProcessRunning(process) {
      processRunningComponentNode.setAttribute("process", process);
    }

    function hideProcessRunning() {
      processRunningComponentNode.removeAttribute("process");
    }

    function playSuccess() {
      successComponentNode.setAttribute("play", true);
    }

    async function getAppConfiguration(configurationPath) {
      return fetch(configurationPath).then(function(response) {
        return response.json();
      });
    }

    function initializeFireBase(config) {
      firebase.initializeApp(config);
      databaseReference = firebase.database().ref(config.reference);
    }

    async function getCurriculumVitaeJsonFromFile(curriculumVitaePath) {
      return fetch(curriculumVitaePath).then(function(response) {
        return response.json();
      });
    }

    function setCurriculumVitaeToDataBase(curriculumVitae) {
      return databaseReference.push(curriculumVitae);
    }

    async function initialize() {
      showLoading();
      setProcessRunning("Taking app configuration");

      configuration = await getAppConfiguration(configurationPath);

      const configurationIsOk =
        configuration ||
        configuration.firebase ||
        configuration.curriculum ||
        configuration.curriculum.path;

      if (!configurationIsOk) {
        return;
      }

      setProcessRunning("Initializing firebase");
      initializeFireBase(configuration.firebase);
      setProcessRunning("Taking curriculum vitae from external file");

      curriculumVitaeFromFile = await getCurriculumVitaeJsonFromFile(
        configuration.curriculum.path
      );

      if (!curriculumVitaeFromFile) {
        return;
      }

      setProcessRunning("Setting curriculum vitae into firebase");
      setCurriculumVitaeToDataBase(curriculumVitaeFromFile);
      setProcessRunning("Your curriculum vitae is in firebase");
      hideLoading();
      playSuccess();
    }

    return {
      initialize
    };
  };

  return instanceMethods;
})();

const app = new App();
app.initialize();
