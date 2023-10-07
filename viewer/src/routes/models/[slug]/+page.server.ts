import { error } from "@sveltejs/kit";
import { getModels, getScenes } from "$lib/dataLoader";

export async function load({ params }) {
    const models = await getModels();
    const scenes = await getScenes();

    const model = models.find((model: any) => model.slug === params.slug);
    const modelScenes = scenes.filter((scene: any) => scene.model === params.slug);

    return {
        model: model,
        scenes: modelScenes
    };
}