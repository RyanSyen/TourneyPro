/// <reference types="@welldone-software/why-did-you-render" />

import React from 'react';

if (process.env.NODE_ENV === 'development') {
  // const whyDidYouRender = require('@welldone-software/why-did-you-render');
  // whyDidYouRender(React, {
  //   trackAllPureComponents: true,
  // });
  import('@welldone-software/why-did-you-render').then(
    ({ default: whyDidYouRender }) => {
      whyDidYouRender(React, {
        trackAllPureComponents: true,
      });
    }
  );
}
