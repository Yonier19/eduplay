<template>
	<main class="login-form">
		<Form />
	</main>
</template>

<script setup lang="ts">
import Form from '@/components/Login/Form.vue'
</script>

<style scoped>
.login-form {
	display: grid;
	place-items: center;
	width: 100%;
	min-height: 100dvh;
	padding: 2rem 1rem;
	overflow-y: auto;
	overflow-x: hidden;
}
</style>
