import Mock from "mockjs";
console.log('[el] example mocked')
Mock.mock(/\/example\/tabledata/, 'get', {
  "list|1-10": [
    {
      "id|+1": 1,
    },
  ],
});

