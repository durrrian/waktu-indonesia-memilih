'use client'

import { Keystrokes } from '@rwh/keystrokes'
import { KeystrokesProvider as ReactKeystrokesProvider, useKey, useKeyCombo } from '@rwh/react-keystrokes'

export const KeystrokesProvider = ({ children }: { children: React.ReactNode }) => {
  const keystrokes = new Keystrokes()

  return <ReactKeystrokesProvider keystrokes={keystrokes}>{children}</ReactKeystrokesProvider>
}
