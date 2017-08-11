/* eslint
  max-len: 0
  class-methods-use-this: 0
*/

import forOwn from 'lodash/forOwn';
import merge from 'lodash/merge';
import set from 'lodash/set';

class MockResource {
  constructor(...data) {
    data.forEach(obj => merge(this, obj));
    return this;
  }

  get() {
    return [];
  }

  update(data) {
    forOwn(data, (value, key) => set(this, key, value));
    return this;
  }

  save() {
    return new Promise(resolve => resolve(this));
  }
}

function project(extraData = {}) {
  return new MockResource({
    id: '123213',
    launch_approved: true,
    mobile_friendly: true
  }, extraData);
}

function task(extraData = {}) {
  return new MockResource({
    question: 'What is it?',
    type: 'single',
    answers: [
      { label: 'Yes' },
      { label: 'No' }
    ]
  }, extraData);
}

function workflow(extraData = {}) {
  return new MockResource({
    tasks: {
      T0: {
        answers: [
          { label: 'Yes' },
          { label: 'No' }
        ]
      }
    },
    swipe_enabled: true
  }, extraData);
}

const validationFixtures = {
  launchApprovedProject: {
    project: {
      launch_approved: false,
    }
  },
  taskQuestionTooLong: {
    task: {
      question: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla ut dui erat. Vivamus est nisl, accumsan non urna at, elementum tempor urna. Sed eget pulvinar eros. Nunc placerat metus bibendum lacus elementum, vitae sagittis mi tincidunt.'
    }
  },
  taskHasThreeAnswers: {
    task: {
      answers: [
        { label: 'Yes' },
        { label: 'No' },
        { label: 'Maybe' }
      ]
    }
  },
  taskFeedbackEnabled: {
    task: {
      feedback: {
        enabled: true
      }
    }
  },
  workflowFlipbookEnabled: {
    workflow: {
      configuration: {
        multi_image_mode: 'flipbook'
      }
    }
  },
  workflowHasMultipleTasks: {
    workflow: {
      tasks: {
        T1: {}
      }
    }
  },
  workflowTooManyShortcuts: {
    workflow: {
      tasks: {
        T1: {
          answers: [
            { label: 'Nothing here' },
            { label: 'Too many clouds' },
            { label: 'Too much water' }
          ],
          type: 'shortcut'
        }
      }
    },
    task: {
      unlinkedTask: 'T1'
    }
  }
};

export {
  MockResource,
  project,
  task,
  validationFixtures,
  workflow
};
