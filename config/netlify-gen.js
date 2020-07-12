// Generates the config.yml on stdout - node netlif-gen.js

const languages = require('./i18n')

const genConfig = (locale) => {
  return `  - name: '${locale.path}'
    label: '${locale.path}'
    folder: 'content/${locale.path}'
    create: true
    slug: 'index'
    media_folder: ''
    public_folder: ''
    summary: '{{category}}/{{sub}}'
    path: '{{category}}/{{sub}}/index'
    editor:
      preview: false
    fields:
      - { label: 'Category', name: 'category', widget: 'string' }
      - { label: 'Subcategory', name: 'sub', widget: 'string' }
      - { label: 'Infographics', name: "infographics", widget: "list", summary: '{{fields.image}}', fields: [{label: AltText, name: alttext, widget: string}, {label: Image, name: image, widget: image}]}
      - { label: 'Category Summary', name: 'body', widget: 'markdown'}`
}

for (let locale of Object.keys(languages)) {
  console.log(genConfig(languages[locale]))
}
