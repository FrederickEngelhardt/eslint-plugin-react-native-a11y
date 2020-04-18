/* eslint-env jest */
/**
 * @fileoverview Ensure that accessibilityIgnoresInvertColors property value is a boolean.
 * @author Dominic Coelho
 */

// -----------------------------------------------------------------------------
// Requirements
// -----------------------------------------------------------------------------

import { RuleTester } from 'eslint';
import parserOptionsMapper from '../../__util__/parserOptionsMapper';
import rule from '../../../src/rules/has-valid-accessibility-ignores-invert-colors';

// -----------------------------------------------------------------------------
// Tests
// -----------------------------------------------------------------------------
const typeError = {
  message: 'accessibilityIgnoresInvertColors prop is not a boolean value',
  type: 'JSXElement',
};

const missingPropError = {
  message:
    'Found an element which will be inverted. Add the accessibilityIgnoresInvertColors prop',
  type: 'JSXElement',
};

const validCustomImport = [
  {
    title: 'does not throw an error with custom Image components',
    code: `import { Text, Image, View } from './custom-image-component/Image';
    const Component = () => (
      <View>
        <Image />
      </View>
    );`,
    parserOptions: {
      sourceType: 'module',
    },
  },
  {
    title: 'works with fragments and multiple elements',
    code: `import {
    Button,
    FlatList,
    Platform,
    ScrollView,
    View,
  } from 'react-native';
  import FastImage from './components/FastImage';
  import Image from './components/AccessibilityImage';
  const Component = () => (
    <>
      <FastImage accessibilityIgnoresInvertColors />
      <FastImage accessibilityIgnoresInvertColors />
      <FastImage accessibilityIgnoresInvertColors />
      <Image accessibilityIgnoresInvertColors={'true'} />
    </>
  );`,
    options: [
      {
        invertableComponents: ['FastImage'],
      },
    ],
    parserOptions: {
      sourceType: 'module',
    },
  },
];

const valid = [
  { code: '<View accessibilityIgnoresInvertColors></View>;' },
  { code: '<View accessibilityIgnoresInvertColors={true}></View>' },
  { code: '<View accessibilityIgnoresInvertColors={false}></View>' },
  {
    code: '<ScrollView accessibilityIgnoresInvertColors></ScrollView>',
  },
  {
    code: '<Image accessibilityIgnoresInvertColors />',
  },
  {
    code: '<View accessibilityIgnoresInvertColors><Image /></View>',
  },
  {
    code:
      '<View accessibilityIgnoresInvertColors><View><Image /></View></View>',
  },
  {
    code: '<View><View /></View>',
  },
  {
    code: '<FastImage accessibilityIgnoresInvertColors />',
    options: [
      {
        invertableComponents: ['FastImage'],
      },
    ],
  },
  {
    code: `const invertColors = true;
           const Component = () => (
             <Image accessibilityIgnoresInvertColors={invertColors} />
           );`,
  },
  ...validCustomImport,
];

const invalidCustomImport = [
  {
    title:
      'throws a missing prop error for custom components alongside passing Image that is imported from react-native',
    code: `import {
    Image,
    Button,
    FlatList,
    Platform,
    ScrollView,
    View,
  } from 'react-native';
  import FastImage from './components/FastImage'
  const Component = () => (
    <View>
      <FastImage accessibilityIgnoresInvertColors />
      <Image />
    </View>
  );`,
    errors: [missingPropError],
    options: [
      {
        invertableComponents: ['FastImage'],
      },
    ],
    parserOptions: {
      sourceType: 'module',
    },
  },
  {
    title:
      'throws a missingPropError for invertibleComponents and type error for Image when it is imported from react-native',
    code: `import {
    Image,
    Button,
    FlatList,
    Platform,
    ScrollView,
    View,
  } from 'react-native';
  import FastImage from './components/FastImage'
  const Component = () => (
    <View>
      <FastImage />
      <Image accessibilityIgnoresInvertColors={'true'} />
    </View>
  );`,
    errors: [missingPropError, typeError],
    options: [
      {
        invertableComponents: ['FastImage'],
      },
    ],
    parserOptions: {
      sourceType: 'module',
    },
  },
  {
    title: 'can throw multiple errors for custom and normal Image components',
    code: `import {
    Image,
    Button,
    FlatList,
    Platform,
    ScrollView,
    View,
  } from 'react-native';
  import FastImage from './components/FastImage'
  const Component = () => (
    <View>
      <FastImage />
      <FastImage accessibilityIgnoresInvertColors={'true'} />
      <FastImage accessibilityIgnoresInvertColors={'false'} />
      <Image />
      <Image accessibilityIgnoresInvertColors={'true'} />
      <Image accessibilityIgnoresInvertColors={'false'} />
    </View>
  );`,
    errors: [
      missingPropError,
      typeError,
      typeError,
      missingPropError,
      typeError,
      typeError,
    ],
    options: [
      {
        invertableComponents: ['FastImage'],
      },
    ],
    parserOptions: {
      sourceType: 'module',
    },
  },
  {
    title: 'should fail',
    code: `import React from 'react'
    import { Image } from 'react-native';

    export const RNImage = (props) => <Image source={props.source} />
    `,
    errors: [missingPropError],
    parserOptions: {
      sourceType: 'module',
    },
  },
  {
    title: 'supports linting module imports',
    code: `import * as RN from 'react-native';
  const { Image } = RN;
  
  const Component = (props) => (
    <Image source={props.source} />
  );
  `,
    errors: [missingPropError],
    parserOptions: {
      sourceType: 'module',
    },
  },
  {
    title:
      'supports linting on Custom Invertable ImageComponents without react-native imported',
    code: `import { FastImage } from './fast-image'
  
  const Component = (props) => (
    <>
      <FastImage />
      <FastImage accessibilityIgnoresInvertColors={'true'} />
    </>
  );
  `,
    errors: [missingPropError, typeError],
    parserOptions: {
      sourceType: 'module',
    },
    options: [
      {
        invertableComponents: ['FastImage'],
      },
    ],
  },
];

const invalid = [
  {
    code: '<View accessibilityIgnoresInvertColors={"true"}></View>',
    errors: [typeError],
  },
  {
    code: '<View accessibilityIgnoresInvertColors={"False"}></View>',
    errors: [typeError],
  },
  {
    code: '<View accessibilityIgnoresInvertColors={0}></View>',
    errors: [typeError],
  },
  {
    code: `<View accessibilityIgnoresInvertColors={1}>
      <Image
        style={{width: 50, height: 50}}
        source={{uri: 'https://facebook.github.io/react-native/img/tiny_logo.png'}}
      />
    </View>`,
    errors: [typeError, missingPropError],
  },
  {
    code: '<View accessibilityIgnoresInvertColors={{enabled: 1}}></View>',
    errors: [typeError],
  },
  {
    code: '<View accessibilityIgnoresInvertColors={{value: true}}></View>',
    errors: [typeError],
  },
  {
    code: '<Image />',
    errors: [missingPropError],
  },
  {
    code: '<View><Image /></View>',
    errors: [missingPropError],
  },
  {
    code: '<View><View><Image /></View></View>',
    errors: [missingPropError],
  },
  {
    code: '<FastImage />',
    errors: [missingPropError],
    options: [
      {
        invertableComponents: ['FastImage'],
      },
    ],
  },
  ...invalidCustomImport,
];

/**
 * Solution to rule tester's dynamic title issue
 */
RuleTester.describe = function (text, method) {
  RuleTester.testId = 0;
  RuleTester.it.title = text;
  return method.call(this);
};

RuleTester.it = function (text, method) {
  const computedTitle =
    eval(RuleTester.it.title)[RuleTester.testId].title || text;
  test(computedTitle, method);
  RuleTester.testId += 1;
};

const ruleTester = new RuleTester();

ruleTester.run('has-valid-accessibility-ignores-invert-colors', rule, {
  valid: valid.map(parserOptionsMapper),
  invalid: invalid.map(parserOptionsMapper),
});
