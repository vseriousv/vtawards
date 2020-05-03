<template>
    <div>
        <div :class="`admin-panel ${dnone}`">
            <div class="mxw1200 contentPanel">
                <span class="adminText_logo">AbraCode</span>
                <router-link to="/admin/general">Админка</router-link>
                <router-link to="/admin/users">Управление пользователями</router-link>
                <router-link to="/admin/members">Управление участниками</router-link>
                <router-link to="/admin/voting">Управление голосованием</router-link>
            </div>
        </div>
        <div :class="`${adminTrue}`"></div>
    </div>
</template>

<script>
    export default {
        name: "AdminPanel",
        props: ['adminTrue', 'dnone'],
        created() {
            this.$emit('checkAdminPanel');
        }
    }
</script>

<style lang="scss" scoped>
.admin-panel{
    position: fixed;
    width: 100%;
    height: 25px;
    background-color: #202020;
    .contentPanel{
        padding: 0 15px;
    }
    a {
        color: white;
        text-decoration: none;
        font-size: 12px;
        margin: 0 10px;
        &:hover {
            color: #FFB900;
        }
    }
}
    .adminText_logo {
        color: white;
        margin-right: 40px;
    }
.displayNone{
    display: none;
}
.displayActive {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    display: block;
}
</style>
