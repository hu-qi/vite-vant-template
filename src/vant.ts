import { App } from 'vue'
import { Button, Toast, Card, Grid, GridItem, Loading } from 'vant'

export const setVant = (app: App) => {
  app
    .use(Button)
    .use(Toast)
    .use(Card)
    .use(Grid)
    .use(GridItem)
    .use(Loading)
}
