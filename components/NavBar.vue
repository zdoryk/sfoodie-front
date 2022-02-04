<template>
    <div>
        <div class="row">
            <b-list-group class="col-3">
                    <b-list-group-item href="#some-link">Awesome link</b-list-group-item>
                    <b-list-group-item href="#" active>Link with active state</b-list-group-item>
                    <b-list-group-item href="#">Action links are easy</b-list-group-item>
                    <b-list-group-item href="#foobar" disabled>Disabled link</b-list-group-item>
            </b-list-group>
            <b-list-group class="col">
                    <b-list-group-item href="#some-link">Awesome link</b-list-group-item>
                    <b-list-group-item href="#" active>Link with active state</b-list-group-item>
                    <b-list-group-item href="#">Action links are easy</b-list-group-item>
                    <b-list-group-item href="#foobar" disabled>Disabled link</b-list-group-item>
            </b-list-group>
        </div>
        <div>
            <b-sidebar id="sidebar-variant" title="Sidebar" bg-variant="dark" text-variant="light" shadow>
                <div class="px-3 py-2">
                    <p>
                    Cras mattis consectetur purus sit amet fermentum. Cras justo odio, dapibus ac facilisis
                    in, egestas eget quam. Morbi leo risus, porta ac consectetur ac, vestibulum at eros.
                    </p>
                    <b-img src="https://picsum.photos/500/500/?image=54" fluid thumbnail></b-img>
                </div>
            </b-sidebar>
        </div>
    </div>
</template>

<script>
export default {

}
</script>

<style>

</style>