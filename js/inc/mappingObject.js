var mappingObject = {
  groups: [
    {
      name: 'Group name',
      fields: [
        {
          name: 'Field name',
          routes: ['List', 'of', 'routes'],
          resources: [
            {
              name: 'Resource name',
              read: ['List', 'of', 'fields'],
              update: ['List', 'of', 'update', 'fields']
            },
            {
              name: 'Another Resource name',
              read: ['List', 'of', 'fields'],
              update: ['List', 'of', 'update', 'fields']
            }
          ]
        },
        {
          name: 'Field name 2',
          routes: ['List', 'of', 'routes'],
          resources: [
            {
              name: 'Resource name 2',
              read: ['List', 'of', 'fields'],
              update: ['List', 'of', 'update', 'fields']
            }
          ]
        }
      ]
    }
  ]
};
