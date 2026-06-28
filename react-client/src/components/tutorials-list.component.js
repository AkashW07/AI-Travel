import React, { Component } from "react";
import TutorialDataService from "../services/tutorial.service";
import { Link } from "react-router-dom";

export default class TutorialsList extends Component {
  constructor(props) {
    super(props);
    this.onChangeSearchTitle = this.onChangeSearchTitle.bind(this);
    this.retrieveTutorials = this.retrieveTutorials.bind(this);
    this.refreshList = this.refreshList.bind(this);
    this.setActiveTutorial = this.setActiveTutorial.bind(this);
    this.removeAllTutorials = this.removeAllTutorials.bind(this);
    this.searchTitle = this.searchTitle.bind(this);

    this.state = {
      tutorials: [],
      currentTutorial: null,
      currentIndex: -1,
      searchTitle: ""
    };
  }

  componentDidMount() {
    this.retrieveTutorials();
  }

  onChangeSearchTitle(e) {
    const searchTitle = e.target.value;

    this.setState({
      searchTitle: searchTitle
    });
  }

  retrieveTutorials() {
    TutorialDataService.getAll()
      .then(response => {
        this.setState({
          tutorials: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  refreshList() {
    this.retrieveTutorials();
    this.setState({
      currentTutorial: null,
      currentIndex: -1
    });
  }

  setActiveTutorial(tutorial, index) {
    this.setState({
      currentTutorial: tutorial,
      currentIndex: index
    });
  }

  removeAllTutorials() {
    if (window.confirm("Are you sure you want to delete all saved itineraries?")) {
      TutorialDataService.deleteAll()
        .then(response => {
          console.log(response.data);
          this.refreshList();
        })
        .catch(e => {
          console.log(e);
        });
    }
  }

  searchTitle() {
    this.setState({
      currentTutorial: null,
      currentIndex: -1
    });

    TutorialDataService.findByTitle(this.state.searchTitle)
      .then(response => {
        this.setState({
          tutorials: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  render() {
    const { searchTitle, tutorials, currentTutorial, currentIndex } = this.state;

    return (
      <div className="list row" style={{ padding: "10px" }}>
        {/* Search Bar Section */}
        <div className="col-md-8">
          <div className="input-group mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Search by Destination (e.g. Paris)"
              value={searchTitle}
              onChange={this.onChangeSearchTitle}
            />
            <div className="input-group-append">
              <button
                className="btn btn-outline-secondary"
                type="button"
                onClick={this.searchTitle}
              >
                Search
              </button>
            </div>
          </div>
        </div>

        {/* Sidebar History Column */}
        <div className="col-md-6">
          <h4>🗺️ Saved Travel Plans</h4>

          <ul className="list-group">
            {tutorials &&
              tutorials.map((tutorial, index) => (
                <li
                  className={
                    "list-group-item " +
                    (index === currentIndex ? "active" : "")
                  }
                  onClick={() => this.setActiveTutorial(tutorial, index)}
                  key={index}
                  style={{ cursor: "pointer", textTransform: "capitalize" }}
                >
                  📍 {tutorial.title}
                </li>
              ))}
          </ul>

          <button
            className="m-3 btn btn-sm btn-danger"
            onClick={this.removeAllTutorials}
          >
            Clear All History
          </button>
        </div>

        {/* Selected AI Data View Column */}
        <div className="col-md-6">
          {currentTutorial ? (
            <div style={{ padding: "15px", background: "#f8f9fa", borderRadius: "8px", border: "1px solid #dee2e6" }}>
              <h4>Itinerary Specifications</h4>
              <hr />
              <div className="mb-2">
                <label>
                  <strong>Destination:</strong>
                </label>{" "}
                <span style={{ textTransform: "capitalize", fontWeight: "600" }}>{currentTutorial.title}</span>
              </div>
              <div className="mb-3">
                <label>
                  <strong>AI Generated Plan:</strong>
                </label>
                {/* whiteSpace: "pre-wrap" keeps Gemini paragraphs intact */}
                <p style={{ 
                  whiteSpace: "pre-wrap", 
                  background: "#fff", 
                  padding: "15px", 
                  borderRadius: "5px", 
                  border: "1px solid #e2e8f0",
                  fontSize: "14px",
                  lineHeight: "1.5"
                }}>
                  {currentTutorial.description}
                </p>
              </div>
              <div className="mb-3">
                <label>
                  <strong>Status:</strong>
                </label>{" "}
                <span className={`badge ${currentTutorial.published ? 'badge-success' : 'badge-info'}`}>
                  {currentTutorial.published ? "Confirmed" : "Saved Draft"}
                </span>
              </div>

              <Link
                to={"/tutorials/" + currentTutorial.id}
                className="btn btn-sm btn-warning"
              >
                Edit Parameters
              </Link>
            </div>
          ) : (
            <div style={{ padding: "20px", textAlign: "center", color: "#777" }}>
              <br />
              <p>👈 Select an itinerary from history to read the custom AI guide...</p>
            </div>
          )}
        </div>
      </div>
    );
  }
}