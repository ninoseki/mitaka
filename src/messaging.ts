import { defineExtensionMessaging } from '@webext-core/messaging'

import type { Message } from '~/types'

interface ProtocolMap {
  createContextMenus(message: Message): void
}

export const { sendMessage, onMessage } = defineExtensionMessaging<ProtocolMap>()
