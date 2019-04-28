import React from 'react';

// import classes from './section.css';

const Section = ({ children, styles }) => {
  // let styles = {...className, ...classes.SectionComponent}

  return (
    <div className={ styles }>
      { children }
    </div>
  )
}

export default Section;