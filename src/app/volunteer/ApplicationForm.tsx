"use client";

/**
 * Non-functional placeholder for the volunteer application.
 * Lives in its own client component so the Server Component page
 * doesn't try to pass event handlers across the boundary.
 *
 * To make this actually submit, POST to a new /api/applications route
 * and replace the onSubmit body with the fetch call.
 */
export default function ApplicationForm() {
  return (
    <form
      className="form-card reveal d2"
      action="#"
      onSubmit={(e) => {
        e.preventDefault();
        const btn = e.currentTarget.querySelector<HTMLButtonElement>(".form-submit");
        if (btn) {
          btn.textContent = "Application filed.";
          btn.disabled = true;
        }
      }}
    >
      <div className="form-row two">
        <div>
          <label htmlFor="fn">First name</label>
          <input id="fn" name="fn" type="text" required />
        </div>
        <div>
          <label htmlFor="ln">Last name</label>
          <input id="ln" name="ln" type="text" required />
        </div>
      </div>
      <div className="form-row">
        <label htmlFor="em">Email</label>
        <input id="em" name="em" type="email" required placeholder="you@domain.edu" />
      </div>
      <div className="form-row two">
        <div>
          <label htmlFor="rl">Role</label>
          <select id="rl" name="rl" defaultValue="01">
            <option value="01">01 · Blood-pressure station</option>
            <option value="02">02 · Translator</option>
            <option value="03">03 · Workshop co-leader</option>
            <option value="04">04 · Newsroom fact-checker</option>
            <option value="05">05 · Mobile-unit shadow</option>
            <option value="06">06 · Outreach lead</option>
          </select>
        </div>
        <div>
          <label htmlFor="hr">Hours / week</label>
          <select id="hr" name="hr" defaultValue="2-4">
            <option>2–4</option>
            <option>4–6</option>
            <option>6–8</option>
            <option>8+</option>
          </select>
        </div>
      </div>
      <div className="form-row">
        <label htmlFor="ms">Why this role?</label>
        <textarea
          id="ms"
          name="ms"
          style={{ minHeight: 100 }}
          placeholder="Three or four sentences are plenty."
        />
      </div>
      <button type="submit" className="form-submit">
        Submit application
      </button>
    </form>
  );
}
