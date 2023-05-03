const PLACEHOLDER = "{{value}}"; 

export const buildUrl = (template, value) => {
    return template.replaceAll(PLACEHOLDER, value);
};
