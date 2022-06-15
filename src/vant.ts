import { App } from 'vue'
import { Button, Toast, Card } from 'vant'

export const setVant = (app: App) => {
  app
    .use(Button)
    .use(Toast)
    .use(Card)
}
