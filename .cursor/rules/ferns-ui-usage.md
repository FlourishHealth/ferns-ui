# Ferns UI Usage Guidelines for AI

When generating code that uses the Ferns UI library, follow these guidelines to ensure consistency and correctness:

## Import Pattern

```typescript
// Preferred: Named imports for commonly used components
import {Button, Box, Text, useTheme} from 'ferns-ui';

// For types
import type {ButtonProps} from 'ferns-ui';
```

## Component Usage

### Layout with Box
```typescript
<Box 
  direction="row"  // or "column"
  padding={4}      // theme spacing units (4 = 16px)
  gap={2}          // consistent spacing between children
  alignItems="center"
>
  <Text>Content</Text>
  <Button text="Action" />
</Box>
```

### Buttons
```typescript
<Button
  text="Submit"
  variant="primary"  // 'primary' | 'secondary' | 'outline' | 'ghost'
  onClick={handleSubmit}
  loading={isLoading}
  disabled={!isValid}
  iconName="check"   // Optional icon from FontAwesome
  iconPosition="left" // or "right"
/>
```

### Forms
```typescript
<TextField
  label="Email"
  value={email}
  onChangeText={setEmail}
  error={emailError}
  helperText="Enter a valid email"
  autoCapitalize="none"
  keyboardType="email-address"
/>
```

### Text and Typography

#### Text Component
```typescript
// Basic text with different variants
<Text>Regular text</Text>
<Text size="sm">Small text</Text>
<Text size="lg">Large text</Text>
<Text weight="bold">Bold text</Text>
<Text color="error">Error text</Text>
<Text align="center">Centered text</Text>
<Text numberOfLines={2} ellipsizeMode="tail">
  Long text that will be truncated after two lines with an ellipsis...
</Text>
```

#### Headings
```typescript
// Use semantic heading levels
<Heading size="h1">Page Title</Heading>
<Heading size="h2">Section Title</Heading>
<Heading size="h3">Subsection</Heading>

// With additional props
<Heading 
  size="h2"
  color="primary"
  marginBottom={4}
  accessibilityRole="header"
>
  Section Title
</Heading>
```

### Modals

#### Basic Modal
```typescript
const [isVisible, setIsVisible] = useState(false);

// In your JSX:
<Button text="Open Modal" onClick={() => setIsVisible(true)} />

<Modal
  title="Confirm Action"
  subtitle="This action cannot be undone"
  visible={isVisible}
  primaryButtonText="Confirm"
  secondaryButtonText="Cancel"
  onDismiss={() => setIsVisible(false)}
  onPrimaryAction={() => {
    // Handle confirm
    setIsVisible(false);
  }}
  onSecondaryAction={() => setIsVisible(false)}
>
  <Text>Are you sure you want to perform this action?</Text>
</Modal>
```

#### Modal with Custom Content
```typescript
<Modal
  title="User Details"
  visible={isUserModalVisible}
  onDismiss={() => setUserModalVisible(false)}
  showCloseButton
  // Hide default buttons for custom actions
  hideDefaultButtons
>
  <Box gap={3}>
    <Text>Name: {user.name}</Text>
    <Text>Email: {user.email}</Text>
    
    <Box direction="row" justifyContent="flex-end" gap={2} marginTop={4}>
      <Button 
        text="Close" 
        variant="outline" 
        onClick={() => setUserModalVisible(false)} 
      />
      <Button 
        text="Send Message" 
        onClick={handleSendMessage}
        iconName="envelope"
      />
    </Box>
  </Box>
</Modal>
```

### Theming
```typescript
const MyComponent = () => {
  const {colors, spacing, typography} = useTheme();
  
  // Use the theme values on bare React Native components. This is generally avoided if possible.
  return (
    <Box padding={spacing.medium}>
      <NativeText style={{fontFamily: typography.heading1, color: colors.primary}}>
        Hello World
      </NativeText>
    </Box>
  );
};
```

## Best Practices

1. **Type Safety**: Always type component props
2. **Accessibility**: Include `accessibilityLabel` on interactive elements
3. **Responsive**: Use `useMediaQuery()` for responsive layouts
4. **Forms**: Use Formik with Ferns form components
5. **Testing**: Use `@testing-library/react-native` for component tests

## Common Pitfalls

- ❌ Don't use inline styles when theme values are available
- ❌ Don't use raw `View` or `Text` when `Box` and Ferns `Text` are available
- ❌ Don't forget to handle loading and error states
- ❌ Don't use `style` prop when equivalent props exist (e.g., `padding`, `margin`)

## Example: Complete Component

```typescript
import React, {FC, useState} from 'react';
import {Button, Box, Text, TextField, useTheme} from 'ferns-ui';

interface LoginFormProps {
  onSubmit: (email: string, password: string) => Promise<void>;
}

export const LoginForm: FC<LoginFormProps> = ({onSubmit}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const {spacing} = useTheme();

  const handleSubmit = async () => {
    try {
      setIsLoading(true);
      setError('');
      await onSubmit(email, password);
    } catch (err) {
      setError(err.message || 'Login failed');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Box padding={4} gap={3}>
      <Text size="xl" weight="bold">Welcome Back</Text>
      
      {Boolean(error) && (
        <Banner type="error" text={error} />
      )}
      
      <TextField
        label="Email"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        keyboardType="email-address"
        autoComplete="email"
      />
      
      <TextField
        label="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        autoComplete="password"
      />
      
      <Button
        text={isLoading ? 'Signing in...' : 'Sign In'}
        onPress={handleSubmit}
        loading={isLoading}
        disabled={!email || !password}
        fullWidth
      />
    </Box>
  );
};
```
