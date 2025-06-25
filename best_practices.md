
<b>Pattern 1: When implementing React Native components, ensure cross-platform compatibility by using appropriate React Native components instead of web-specific elements. Use Text component instead of div elements for React Native compatibility.
</b>

Example code before:
```
if (isLoading) {
  return (
    <StorybookContainer>
      <div>Loading...</div>
    </StorybookContainer>
  );
}
```

Example code after:
```
if (isLoading) {
  return (
    <StorybookContainer>
      <Text>Loading...</Text>
    </StorybookContainer>
  );
}
```

<details><summary>Examples for relevant past discussions:</summary>

- https://github.com/FlourishHealth/ferns-ui/pull/890#discussion_r2146005772
</details>


___

<b>Pattern 2: Remove debug console.log statements and temporary debugging code before merging pull requests. Clean up any leftover debugging artifacts that were added during development.
</b>

Example code before:
```
const numericValue = text.replace(/[^0-9]/g, "");
console.log("Debug value:", numericValue); // Maybe debug? Or just remove.
const finalValue = numericValue === "" ? "00" : numericValue.slice(-2);
```

Example code after:
```
const numericValue = text.replace(/[^0-9]/g, "");
const finalValue = numericValue === "" ? "00" : numericValue.slice(-2);
```

<details><summary>Examples for relevant past discussions:</summary>

- https://github.com/FlourishHealth/ferns-ui/pull/854#discussion_r2021612340
- https://github.com/FlourishHealth/ferns-ui/pull/817#discussion_r1943586287
</details>


___

<b>Pattern 3: Avoid premature optimization with useMemo for simple computations. Reserve useMemo for computationally expensive operations rather than simple conditional logic or basic calculations that don't significantly impact performance.
</b>

Example code before:
```
const iconName = useMemo(() => {
  if (disabled) {
    return undefined;
  } else if (type === "time") {
    return "clock";
  } else {
    return "calendar";
  }
}, [disabled, type]);
```

Example code after:
```
let iconName;
if (disabled) {
  iconName = undefined;
} else if (type === "time") {
  iconName = "clock";
} else {
  iconName = "calendar";
}
```

<details><summary>Examples for relevant past discussions:</summary>

- https://github.com/FlourishHealth/ferns-ui/pull/738#discussion_r1773437814
- https://github.com/FlourishHealth/ferns-ui/pull/808#discussion_r1907882857
</details>


___

<b>Pattern 4: Maintain consistent prop naming conventions across components. Use standardized prop names like 'disabled' instead of custom alternatives, and ensure prop name changes are reflected in all related stories and configurations.
</b>

Example code before:
```
export const BooleanField = ({
  label,
  variant,
  value,
  onChange,
  interaction = true,
  disabledHelperText,
}) => {
```

Example code after:
```
export const BooleanField = ({
  label,
  variant,
  value,
  onChange,
  disabled = false,
  disabledHelperText,
}) => {
```

<details><summary>Examples for relevant past discussions:</summary>

- https://github.com/FlourishHealth/ferns-ui/pull/671#discussion_r1677271064
- https://github.com/FlourishHealth/ferns-ui/pull/673#discussion_r1679724817
</details>


___
