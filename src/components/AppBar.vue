<template>
    <v-app-bar  flat  app dark class="primary">
        <v-container class="mx-auto py-0">
            <v-row align="center"> 
                <v-img
                        :src="require('@/assets/logo.png')"
                        class="mr-5"
                        contain
                        height="48"
                        width="48"
                        max-width="48"
                        @click="$vuetify.goTo(0)"
                />
                <v-toolbar-title class="headline">
                <span class="font-weight-bold">
                    BeHoo
                </span>
                </v-toolbar-title>

                <v-btn
                class="hidden-sm-and-down"
                text
                @click="onClick($event, link)"
                >
                首页
                </v-btn>

                <v-btn
                class="hidden-sm-and-down"
                text
                @click="onClick($event, link)"
                >
                发现
                </v-btn>

                <v-btn
                class="hidden-sm-and-down"
                text
                @click="onClick($event, link)"
                >
                推荐
                </v-btn>

                <v-spacer></v-spacer>

                <v-text-field
                    append-icon="mdi-magnify"
                    flat
                    hide-details
                    solo-inverted
                    label="搜索"
                    style="max-width: 300px;"
                />
                <v-btn
                        dark
                        icon
                >
                    <v-icon>mdi-dots-vertical</v-icon>
                </v-btn>

                <!-- <span class="font-weight-bold">
                    BeHoo
                </span> -->
            </v-row>
        </v-container>
        </v-app-bar>
</template>

<script>
export default {
    name:'AppBar'
}
</script>