Daripada melakukan seperti ini
```js
{condition && <RenderComponent />}
```

Lebih baik seperti ini
```js
<RenderIfTrue isTrue={condition}>
  <RenderComponent />
</RenderIfTrue>
```

Just implement clean code