use std::sync::Arc;
use std::path::PathBuf;

use rspc::{RouterBuilder, Router, Config};
use serde::Deserialize;

use crate::clients::{self, prisma};

pub struct Ctx {
    pub db: Arc<clients::prisma::PrismaClient>
}

#[derive(rspc::Type, Deserialize)]
struct PostCreateInput {
    title: String,
    content: String,
}

#[derive(rspc::Type, Deserialize)]
struct PostUpdateInput {
    id: String,
    title: Option<String>,
    content: Option<String>,
}

pub(crate) fn new() -> RouterBuilder<Ctx> {
    Router::<Ctx>::new()
        .config(Config::new().export_ts_bindings(
            PathBuf::from(env!("CARGO_MANIFEST_DIR")).join("../frontend/src/providers/BackendRust/types.ts")
        ))

        .query("version", |t| t(|_, _: ()| env!("CARGO_PKG_VERSION")))
        
        // post
        .query("get_posts", |t| t(|ctx, _: ()| async move {
            ctx.db.post().find_many(vec![]).exec().await.map_err(Into::into)
        }))
        .query("get_post", |t| t(|ctx, id: String| async move {
            ctx.db.post().find_unique(prisma::post::id::equals(id)).exec().await.map_err(Into::into)
        }))
        .mutation("create_post", |t| t(|ctx, input: PostCreateInput| async move {
            ctx.db.post().create(input.title, input.content, vec![]).exec().await.map_err(Into::into)
        }))
        .mutation("delete_post", |t| t(|ctx, id: String| async move {
            ctx.db.post().delete(prisma::post::id::equals(id)).exec().await.map_err(Into::into)
        }))
        .mutation("update_post", |t| t(|ctx, input: PostUpdateInput| async move {
            ctx.db.post().update(
                prisma::post::id::equals(input.id),
                vec![
                    prisma::post::title::set(input.title.unwrap()),
                    prisma::post::content::set(input.content.unwrap()),
                ]
            ).exec().await.map_err(Into::into)
        }))
}
