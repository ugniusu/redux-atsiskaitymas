import { useState } from "react";

function GoalForm() {
  return (
    <section className="form">
      <form>
        <div className="form-group">
          <label htmlFor="text">Goal</label>
          <input type="text" name="text" id="text" />
        </div>
        <div className="form-group">
          <button className="btn btn-block" type="submit">
            Add Goal
          </button>
        </div>
      </form>
    </section>
  );
}

export default GoalForm;
