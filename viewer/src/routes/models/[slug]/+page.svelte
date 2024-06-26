<script lang="ts">
    import placeholderImage from "$lib/placeholder.png";

    export let data: {
        model: {
            title: string;
            paper: string;
            project: string;
            code: string;
        };
        scenes: {
            slug: string;
            title: string;
            model: string;
        }[];
    };

    function handleImageError(event: Event) {
        const image = event.currentTarget as HTMLImageElement;
        image.src = placeholderImage;
    }

    function goHome() {
        window.location.href = "/";
    }
</script>

<div class="container">
    <div on:pointerdown={goHome} class="banner">
        <h1>3DGS-libary</h1>
        <p>An awesome 3DGS models library</p>
    </div>
    <div class="header">{data.model.title}</div>
    <div class="model-container">
        <div class="model-info">
            <p class="model-header">Info</p>
            <table class="table">
                {#if data.model.paper}
                    <tr>
                        <td>Paper</td>
                        <td><a href={data.model.paper} target="_blank">{data.model.paper}</a></td>
                    </tr>
                {/if}
                {#if data.model.project}
                    <tr>
                        <td>Project</td>
                        <td><a href={data.model.project} target="_blank">{data.model.project}</a></td>
                    </tr>
                {/if}
                {#if data.model.code}
                    <tr>
                        <td>Code</td>
                        <td><a href={data.model.code} target="_blank">{data.model.code}</a></td>
                    </tr>
                {/if}
            </table>
        </div>
        <div class="grid-container">
            {#if data.scenes.length > 0}
                <div class="grid">
                    {#each data.scenes as scene}
                        <a href={`/viewer/${scene.model}/${scene.slug}`} class="grid-item">
                            <img
                                src={`/scenes/${scene.model}/${scene.slug}/thumbnail.png`}
                                alt={scene.title}
                                class="thumbnail"
                                on:error={(event) => handleImageError(event)}
                            />
                            <div class="title">{scene.title}</div>
                        </a>
                    {/each}
                </div>
            {:else}
                <div class="grid">
                    <div class="warning">No scenes found</div>
                </div>
            {/if}
        </div>
    </div>
</div>

<style>
    .model-header {
        padding: 10px;
        font-size: 16px;
        color: #aaa;
        margin: 0;
    }

    .model-info {
        border: 1px solid #333;
        box-sizing: border-box;
        width: 100%;
        margin: 0;

        @media (min-width: 576px) {
            width: 384px;
        }
    }

    .table {
        table-layout: fixed;
        width: 100%;
        margin: 0;
        padding: 0;
        border-collapse: collapse;
    }

    .table td {
        width: 100%;
        margin: 0;
        padding: 10px;
        border-top: 1px solid #333;
        white-space: nowrap;
    }

    .table td:first-child {
        width: 128px;
        background-color: #222;
        border-right: 1px solid #333;
        font-size: 14px;
        font-weight: bold;
        color: #aaa;
    }

    .table td:last-child {
        width: 100%;
        font-size: 14px;
        overflow: hidden;
    }

    .table a {
        color: #6d90b6;
    }

    .model-container {
        display: flex;
        flex-wrap: wrap;
        align-items: flex-start;
    }

    .grid-container {
        flex: 1;
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
    }

    .grid {
        margin-top: 10px;
        margin-left: 0;

        @media (min-width: 576px) {
            margin-top: 0;
            margin-left: 10px;
        }
    }

    .grid-item {
        @media (min-width: 576px) {
            width: 100%;
        }

        @media (min-width: 768px) {
            width: calc(50% - 10px);
        }

        @media (min-width: 992px) {
            width: calc(33.333% - 10px);
        }

        @media (min-width: 1200px) {
            width: calc(25% - 10px);
        }
    }

    .warning {
        width: 100%;
        margin-top: 20px;
        text-align: center;
        color: #aaa;
    }
</style>
