import React from 'react'

export default function Form(props) {
  const {
    cancel,
    errors, 
    submit,
    submitButtonText,
    elements
  } = props;

  // handles submit button behavior
  function handleSubmit(event) {
    event.preventDefault();
    submit();
  }

  // handles cancel button behavior
  function handleCancel(event) {
    event.preventDefault();
    cancel();
  }

  return (
    <div>
    
      {/* validation errors from ErrorDisplay() function below */}
      <ErrorDisplay errors={errors} />
      <form onSubmit={handleSubmit}>
        {elements()} 
        <div>
          <button className="button" type="submit">{submitButtonText}</button>
          <button className="button button-secondary" onClick={handleCancel}>Cancel</button>
        </div>
      </form>
    </div>
  );
}

// returns a list item for each form validation error 
function ErrorDisplay({errors}) {
  let errorsDisplay = null;

  if (errors.length) {
    errorsDisplay = (
        <div className="validation--errors">
          <h3>Validation errors</h3>
          <ul>
            {errors.map((error, i) => (<li key={i}>{error}</li> ))}
          </ul>
        </div>
    );
  }
  return errorsDisplay;
}