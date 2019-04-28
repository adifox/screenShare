import React from 'react';

import Section from '../section';

import classes from './body.module.css';

const Body = () => (
  <div>
    <Section
      styles={ classes.Section }
    >

    </Section>
    <Section
      styles={ classes.SectionTwo }
    >

    </Section>
    <Section
      styles={ classes.SectionThree }
    >

    </Section>
  </div>
)

export default Body;