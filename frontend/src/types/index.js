export const ProcessingStatus = Object.freeze({
    IDLE: 'idle',
    PROCESSING: 'processing',
    COMPLETED: 'completed',
    ERROR: 'error'
});

/**
 * @typedef {Object} FileState
 * @property {File|null} file
 * @property {string} status - one of ProcessingStatus values
 * @property {string|null} error
 */

/**
 * @typedef {Object} SkillCategory
 * @property {string} name
 * @property {string[]} skills
 */
